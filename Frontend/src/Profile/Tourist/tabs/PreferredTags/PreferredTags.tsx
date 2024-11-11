import { DndContext, DragEndEvent, useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";

import {
	useTouristProfile,
	useUpdateTouristProfile,
} from "@/api/data/useProfile";
import { useTags } from "@/api/data/useTags";
import { Button } from "@/components/ui/button";
import { Flex } from "@/components/ui/flex";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from "@/components/ui/select";
import { TTag } from "@/types/global";

import SortableTag from "./SortableTag";

export default function PreferredTags() {
	const { data, refetch } = useTouristProfile();
	const { doEditTouristProfile } = useUpdateTouristProfile(refetch);
	const { data: tags } = useTags();

	const { setNodeRef } = useDroppable({
		id: "tags-drop",
		data: {
			type: "tag-app",
		},
	});

	const [preferredTags, setPreferredTags] = useState<
		{
			id: string;
			tag: TTag;
		}[]
	>([]);

	const onDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (active.id !== over?.id) {
			const oldIndex = preferredTags.findIndex(
				(tag) => tag.id === active.id,
			);
			const newIndex = preferredTags.findIndex(
				(tag) => tag.id === over?.id,
			);
			const newTags = [...preferredTags];
			newTags.splice(oldIndex, 1);
			newTags.splice(newIndex, 0, preferredTags[oldIndex]);
			setPreferredTags(newTags);
		}
	};

	useEffect(() => {
		setPreferredTags(
			data?.preferredTags.map((tag) => ({
				id: tag._id!,
				tag,
			})) || [],
		);
	}, [data]);

	const onAddTag = (tag: TTag) => {
		setPreferredTags((prev) => [
			...prev,
			{
				id: tag._id!,
				tag,
			},
		]);
	};

	const onRemoveTag = (tagId: string) => {
		setPreferredTags((prev) => prev.filter((tag) => tag.id !== tagId));
	};

	const onSave = () => {
		doEditTouristProfile({
			preferredTags: preferredTags.map((tag) => tag.tag._id!),
		});
	};

	return (
		<Flex isColumn gap="2">
			<Flex>
				<Select
					value={undefined}
					onValueChange={(value) => {
						if (value) {
							onAddTag(tags!.find((tag) => tag._id === value)!);
						}
					}}
				>
					<SelectTrigger value={undefined}>
						Select tag to add
					</SelectTrigger>
					<SelectContent>
						{tags
							?.filter(
								(tag) =>
									!preferredTags.find(
										(preferredTag) =>
											preferredTag.tag._id === tag._id,
									),
							)
							?.map((tag) => (
								<SelectItem key={tag._id} value={tag._id!}>
									{tag.name}
								</SelectItem>
							))}
					</SelectContent>
				</Select>
				<Button onClick={onSave}>Save</Button>
			</Flex>
			<DndContext onDragEnd={onDragEnd}>
				<SortableContext
					items={preferredTags}
					strategy={rectSortingStrategy}
				>
					<Flex
						ref={setNodeRef}
						isColumn
						gap="1"
						className="h-56 bg-white rounded-lg overflow-y-scroll p-1"
					>
						{preferredTags.map((tag, index) => (
							<SortableTag
								key={tag.id}
								tag={tag.tag}
								index={index}
								onRemoveTag={onRemoveTag}
							/>
						))}
					</Flex>
				</SortableContext>
			</DndContext>
		</Flex>
	);
}
