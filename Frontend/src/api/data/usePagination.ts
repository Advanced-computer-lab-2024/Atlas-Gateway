import { useCallback, useEffect } from "react";

import { useQueryString } from "./useQueryString";

export type PageItemProps = {
	isCurrent?: boolean;
	isMany?: boolean;
	num?: number;
	dff?: number;
};

export const usePagination = ({
	pageNum,
	pagesCount,
}: {
	pageNum: number;
	pagesCount: number;
}) => {
	const [query, updateQuery] = useQueryString();
	const page = Number(query?.page || 1);

	const onPageChange = useCallback(
		(num: number) => {
			updateQuery({ page: num || 1 });
		},
		[updateQuery],
	);

	useEffect(() => {
		if (!page) {
			updateQuery({ page: 1 });
		}
	}, []);

	const pagesList = Array.from(
		new Set(
			[
				1,
				2,
				pageNum - 1,
				pageNum,
				pageNum + 1,
				pagesCount - 1,
				pagesCount,
			].filter((num) => num > 0),
		),
	).reduce((array, num, index, numArr) => {
		const prv = numArr[index - 1];
		const isCurrent = pageNum == num;

		if (num - prv > 1) {
			array.push({ dff: num - prv, isMany: true });
		}

		if (isNaN(num) || num > pagesCount || index === num) {
			return array;
		}

		array.push({ num: num, isCurrent });
		return array;
	}, [] as PageItemProps[]);

	return {
		pagesList,
		pagesCount,
		page,
		onPageChange,
	};
};
