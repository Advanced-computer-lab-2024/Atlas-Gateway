// searchFilterSortUtil.ts
import { Model, PipelineStage } from "mongoose";

import buildFilterQuery from "./filterBuilder.service";
import buildSearchQuery from "./searchBuilder.service";
import buildSortCriteria from "./sortBuilder.service";

export default function AggregateBuilder(
	query: any,
	searchFields: string[], // Fields to search on (e.g., name, category, tag)
	Limit: number = 10, // Default limit per page
): PipelineStage[] {
	const pipeline: PipelineStage[] = [];
	const page = Number(query.page?.toString()) || 1;
	const limit = Number(query.limit?.toString()) || Limit;
	const skip = (page - 1) * limit;

	// Step 1: Build search query
	const searchQuery = buildSearchQuery(
		query?.search?.toString(),
		searchFields,
	);

	// Step 2: Build filter query
	const filters = buildFilterQuery(query);

	// Step 3: Build sort criteria using allowed sort fields
	const sortCriteria = buildSortCriteria(query);

	// Step 4: Build aggregation pipeline to return paginated results and metadata
	pipeline.push(...searchQuery, ...filters, ...sortCriteria, {
		$facet: {
			data: [{ $skip: skip }, { $limit: limit }],
			total: [{ $count: "count" }],
		},
	});

	// Return aggregation pipeline
	return pipeline;
}
