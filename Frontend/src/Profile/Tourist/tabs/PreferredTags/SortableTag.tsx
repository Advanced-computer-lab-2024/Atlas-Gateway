import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash } from "lucide-react";

import { Flex } from "@/components/ui/flex";
import { TTag } from "@/types/global";

export default function SortableTag({
	tag,
	index,
	onRemoveTag,
}: {
	tag: TTag;
	index: number;
	onRemoveTag: (tag: string) => void;
}) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({
			id: tag._id!,
			attributes: {
				role: "tag",
				tabIndex: index,
			},
		});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<Flex
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className="bg-surface-primary p-2 border border-black rounded-lg"
			justify="between"
		>
			{tag.name}
			<Trash onClick={() => onRemoveTag(tag._id!)} />
		</Flex>
	);
}
