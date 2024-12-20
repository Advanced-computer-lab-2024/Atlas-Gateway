// searchFilterSortUtil.ts
import { PipelineStage } from "mongoose";

import buildFilterQuery from "./Filter/filterBuilder.service";
import buildSearchQuery from "./Search/searchBuilder.service";
import buildSortCriteria from "./Sort/sortBuilder.service";

export default function AggregateBuilder(
	query: any,
	searchFields: string[], // Fields to search on (e.g., name, category, tag)
): PipelineStage[] {
	const pipeline: PipelineStage[] = [];
	const page = Number(query.page?.toString()) || 1;
	const limit = Number(query.limit?.toString()) || 10;
	const skip = (page - 1) * limit;

	const searchQuery = buildSearchQuery(
		query?.search?.toString(),
		searchFields,
	);

	const filters = buildFilterQuery(query);

	const sortCriteria = buildSortCriteria(query);

	pipeline.push(...searchQuery, ...filters, ...sortCriteria, {
		$facet: {
			data: [{ $skip: skip }, { $limit: limit }],
			total: [{ $count: "count" }],
		},
	});

	return pipeline;
}
