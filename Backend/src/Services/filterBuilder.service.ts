import { PipelineStage } from "mongoose";

// Builds the filter query for filtering by different fields
export default function buildFilterQuery(query: any): PipelineStage[] {
	const pipeline: PipelineStage[] = [];

	pipeline.push(
		...filterByPrice(query),
		...filterByDate(query),
		...filterByRatings(query),
		...filterByLanguage(query),
		...filterByCategory(query),
		...filterByTags(query),
	);

	return pipeline; // Return an empty object if no filter criteria apply
}

// Function to filter by price
export function filterByPrice(query: any): PipelineStage[] {
	const pipeline: PipelineStage[] = [];

	if (query.price) {
		const [minPriceStr, maxPriceStr] = query.price.split(",");

		// Parse minPrice and maxPrice, handling null values
		let minPrice: number | null = parseFloat(minPriceStr) || 0;
		let maxPrice: number | null = parseFloat(maxPriceStr) || Infinity;

		// match between the min and max price stage or the price stage
		pipeline.push({
			$match: {
				$or: [
					{
						minPrice: { $gte: minPrice },
					},
					{
						maxPrice: { $lte: maxPrice },
					},
					{
						price: { $gte: minPrice, $lte: maxPrice },
					},
				],
			},
		});
	}

	return pipeline; // Return an empty object if no filter criteria apply
}

// Function to filter by date
export function filterByDate(query: any): PipelineStage[] {
	const pipeline: PipelineStage[] = [];

	if (query.date) {
		const [startDateStr, endDateStr] = query.date.split(",");

		//
		let startDate: Date | null = new Date(startDateStr);
		let endDate: Date | null = new Date(endDateStr);

		if (isNaN(startDate.getTime())) {
			startDate = null; // Treat "null" as no minimum
		}

		if (isNaN(endDate.getTime())) {
			endDate = null; // Treat "null" as no maximum
		}

		const matchStage: any = {};

		if (startDate !== null) {
			matchStage.dateTime = { $gte: startDate };
		}

		if (endDate !== null) {
			if (!matchStage.dateTime) {
				matchStage.dateTime = {};
			}
			matchStage.dateTime.$lte = endDate;
		}

		pipeline.push({
			$match: matchStage,
		});
	}

	return pipeline; // Return an empty object if no filter criteria apply
}

// Function to filter by ratings
export function filterByRatings(query: any): PipelineStage[] {
	const pipeline: PipelineStage[] = [];

	if (query.ratings) {
		const [minRatingStr, maxRatingStr] = query.ratings.split(",");

		// Parse minRating and maxRating, handling null values
		let minRating: number | null = parseFloat(minRatingStr) || 0;
		let maxRating: number | null = parseFloat(maxRatingStr) || 5;

		pipeline.push({
			$match: {
				rating: { $gte: minRating, $lte: maxRating },
			},
		});
	}

	return pipeline; // Return an empty object if no filter criteria apply
}

// Function to filter by language
export function filterByLanguage(query: any): PipelineStage[] {
	const pipeline: PipelineStage[] = [];

	if (query.language) {
		pipeline.push({
			$match: {
				language: { $in: query.language.split(",") },
			},
		});
	}

	return pipeline;
}

// Function to filter by category
export function filterByCategory(query: any): PipelineStage[] {
	const pipeline: PipelineStage[] = [];

	if (query.category) {
		pipeline.push({
			$match: {
				category: { $in: query.category.split(",") },
			},
		});
	}

	return pipeline;
}

// Function to filter by tags
export function filterByTags(query: any): PipelineStage[] {
	const pipeline: PipelineStage[] = [];

	if (query.tags) {
		pipeline.push({
			$match: {
				tags: { $in: query.tags.split(",") },
			},
		});
	}

	return pipeline;
}
