// searchFilterSortUtil.ts
import { Model, PipelineStage } from "mongoose";

import buildFilterQuery from "./filterBuilder.service";
import buildSearchQuery from "./searchBuilder.service";
import buildSortCriteria from "./sortBuilder.service";

export default function AggregateBuilder(
	query: any,
	searchFields: string[], // Fields to search on (e.g., name, category, tag)
	filterFields: any, // Fields to filter (e.g., price, budget, etc.)
	sortFields: string[], // Fields allowed for sorting (e.g., price, rating)
	Limit: number = 10, // Default limit per page
): any[] {
	const page = Number(query.page?.toString()) || 1;
	const limit = Number(query.limit?.toString()) || Limit;
	const skip = (page - 1) * limit;

	// Step 1: Build search query
	const searchQuery = buildSearchQuery(
		query?.search?.toString(),
		searchFields,
	);

	// Step 2: Build filter query
	const filters = buildFilterQuery(query, filterFields);

	// Step 3: Build sort criteria using allowed sort fields
	const sortCriteria = buildSortCriteria(query, sortFields);

	// Step 4: Build aggregation pipeline
	const aggregationPipeline: PipelineStage[] = [
		...searchQuery,
		{
			$match: { ...filters }, // Apply search and filter
		},
		{
			$facet: {
				data: [
					...(Object.keys(sortCriteria).length > 0
						? [{ $sort: sortCriteria }]
						: []), // Only apply sort if sortCriteria has keys
					{ $skip: skip }, // Apply pagination (skip)
					{ $limit: limit }, // Apply pagination (limit)
				],
				total: [{ $count: "count" }], // Count total documents
			},
		},
	];

	// Return aggregation pipeline
	return aggregationPipeline;
}
