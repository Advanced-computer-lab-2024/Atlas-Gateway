import { PipelineStage ,Types } from "mongoose";

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

	return pipeline;
}

export function filterByDate(query: any): PipelineStage[] {
	const pipeline: PipelineStage[] = [];



	if (query.date) {
		const matchStage: any = { dateTime: {} };
		const [startDateStr, endDateStr] = query.date.split(",");

		// if no date is provided, set the start date to the current date
		let startDate = new Date(startDateStr) || new Date();
		let endDate: Date | null = new Date(endDateStr) || null;

		// If the start date is in the past, set it to the current date
		if (startDate < new Date()) {
			startDate = new Date();
		}

		if (endDate !== null) {
			matchStage.dateTime.$lte = endDate;
		}

		matchStage.dateTime.$gte = startDate;

		pipeline.push({
			$match: {
				$or: [
					{
						startDate: { $gte: startDate },
					},
					{
						endDate: { $lte: endDate },
					},
					{
						dateTime: { $gte: startDate, $lte: endDate },
					},
				],
			}
		});
	}
	// If no date is provided, return all activities after the current date
	return pipeline;
}

// Function to filter by ratings
export function filterByRatings(query: any): PipelineStage[] {
	const pipeline: PipelineStage[] = [];

	if (query.ratings) {
		const [minRatingStr, maxRatingStr] = query.ratings.split(",");

		let minRating: number | null = parseFloat(minRatingStr) || 0;
		let maxRating: number | null = parseFloat(maxRatingStr) || 5;

		pipeline.push({
			$match: {
				rating: { $gte: minRating, $lte: maxRating },
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
				language: { $in: query.language.split(",").map((lang: string) => new RegExp(`^${lang}$`, 'i')) },
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
				category: { $in: query.category.split(",").map((category : string )=> new Types.ObjectId(category)) } ,
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
				tags: { $in: query.tags.split(",").map((tag : string )=> new Types.ObjectId(tag)) },
			},
		});
	}

	return pipeline;
}
