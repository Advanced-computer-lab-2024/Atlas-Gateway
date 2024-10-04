import { PipelineStage } from "mongoose";

export default function buildSortCriteria(query: any): PipelineStage[] {
	const pipeline: PipelineStage[] = [];

	// If sort query is provided, split by comma before comma is used to sort by
	// if after comma negative 1 is used to sort in descending order
	// else 1 is used to sort in ascending order
	if (query.sort) {
		const [sortby, order] = query.sort.split(",");
		const sortOrder = order === "-1" ? -1 : 1;

		pipeline.push({
			$sort: {
				[sortby]: sortOrder,
			},
		});
	}

	return pipeline;
}
