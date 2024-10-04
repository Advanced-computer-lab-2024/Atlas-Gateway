import { PipelineStage } from "mongoose";

// Builds the filter query for filtering by different fields
export default function buildFilterQuery(query: any): PipelineStage[] {
	const pipeline: PipelineStage[] = [];
	//filter by price
	if (query.price) {
		const [minPriceStr, maxPriceStr] = query.price.split(",");

		// Parse minPrice and maxPrice, handling null values
		let minPrice: number | null = parseFloat(minPriceStr);
		let maxPrice: number | null = parseFloat(maxPriceStr);

		if (isNaN(minPrice)) {
			minPrice = null; // Treat "null" as no minimum
		}

		if (isNaN(maxPrice)) {
			maxPrice = null; // Treat "null" as no maximum
		}

		const matchStage: any = {};

		if (minPrice !== null) {
			matchStage.price = { $gte: minPrice };
		}

		if (maxPrice !== null) {
			if (!matchStage.price) {
				matchStage.price = {};
			}
			matchStage.price.$lte = maxPrice;
		}

		pipeline.push({
			$match: matchStage,
		});
	}
	//filter by Date
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
	//filter by category
	if (query.category) {
		pipeline.push({
			$match: {
				category: query.category,
			},
		});
	}
	//filter by tags
	if (query.tags) {
		pipeline.push({
			$match: {
				tags: { $in: query.tags.split(",") },
			},
		});
	}
	//filter by language
	if (query.language) {
		pipeline.push({
			$match: {
				language: query.language,
			},
		});
	}
	//filter by ratings
	if (query.ratings) {
		const [minRatingStr, maxRatingStr] = query.ratings.split(",");

		// Parse minRating and maxRating, handling null values
		let minRating: number | null = parseFloat(minRatingStr);
		let maxRating: number | null = parseFloat(maxRatingStr);

		if (isNaN(minRating)) {
			minRating = null; // Treat "null" as no minimum
		}

		if (isNaN(maxRating)) {
			maxRating = null; // Treat "null" as no maximum
		}

		const matchStage: any = {};

		if (minRating !== null) {
			matchStage.rating = { $gte: minRating };
		}

		if (maxRating !== null) {
			if (!matchStage.rating) {
				matchStage.rating = {};
			}
			matchStage.rating.$lte = maxRating;
		}

		pipeline.push({
			$match: matchStage,
		});
	}

	return pipeline; // Return an empty object if no filter criteria apply
}
