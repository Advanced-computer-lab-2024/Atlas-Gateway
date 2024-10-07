import { PipelineStage, Types } from "mongoose";
import { formatDate } from "date-fns";

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

	return pipeline;
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
						minPrice: { $gte: minPrice, $lte: maxPrice },
					},
					{
						maxPrice: { $lte: maxPrice, $gte: minPrice },
					},
					{
						price: { $gte: minPrice, $lte: maxPrice },
					},
				],
			},
		});
	}

	return pipeline;
}

export function filterByDate(query: any): PipelineStage[] {
	const pipeline: PipelineStage[] = [];

	if (query.date) {
		let matchStage = {
		};
		const [key, startDateStr, endDateStr] = query.date.split(",");

		// if no date is provided, set the start date the lowest possible date and the end date to null
		let startDate = new Date(startDateStr) || new Date("1970-01-01T00:00:00.000Z");
		let endDate: Date | null = endDateStr !== "null" ? new Date(endDateStr) : null;

		
		if (startDate && endDate) {
			matchStage = {
				$or: [
					{
						key: { $gte: formatDate(startDate, "YYYY-MM-DD"), $lte: formatDate(endDate, "YYYY-MM-DD") },
					},
				],
			};
		}
		else if (startDate) {
			matchStage = {
				$or: [
					{
						key: { $gte: formatDate(startDate, "YYYY-MM-DD") },
					},
				],
			};
		}
		else if (endDate) {
			matchStage = {
				$or: [
					{
						key: { $lte:  formatDate(endDate, "YYYY-MM-DD") },
					},
				],
			};
		}

		console.log(matchStage)


		pipeline.push({
			$match: {
				$or: [
					{
						dateTime: { $gte: formatDate(new Date(), "YYYY-MM-DD") },
					},
				],
			},
		});
	}
	// If no date is provided, return all activities after the current date
	return pipeline;
}


// Function to filter by ratings
export function filterByRatings(query: any): PipelineStage[] {
	const pipeline: PipelineStage[] = [];

	if (query.avgRating) {
		const [minRatingStr, maxRatingStr] = query.avgRating.split(",");

		let minRating: number | null = parseFloat(minRatingStr) || 0;
		let maxRating: number | null = parseFloat(maxRatingStr) || 5;

		pipeline.push({
			$match: {
				avgRating: { $gte: minRating, $lte: maxRating },
			},
		});
	}

	return pipeline;
}

// Function to filter by language
export function filterByLanguage(query: any): PipelineStage[] {
	const pipeline: PipelineStage[] = [];

	if (query.language) {
		pipeline.push({
			$match: {
				language: {
					$in: query.language
						.split(",")
						.map((lang: string) => new RegExp(`^${lang}$`, "gi")),
				},
			},
		});
	}

	return pipeline;
}

// Function to filter by category
export function filterByCategory(query: any): PipelineStage[] {
	const pipeline: PipelineStage[] = [];

	if (query.categories) {
		pipeline.push({
			$match: {
				"categories._id": {
					$in: query.categories
						.split(",")
						.map(
							(category: string) => new Types.ObjectId(category),
						),
				},
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
				"tags._id": {
					$in: query.tags
						.split(",")
						.map((tag: string) => new Types.ObjectId(tag)),
				},
			},
		});
	}

	return pipeline;
}
