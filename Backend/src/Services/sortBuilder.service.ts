// Builds the sort criteria for sorting by multiple fields
export default function buildSortCriteria(query: any, sortFields: string[]) {
	const sortCriteria: any = {};

	// Check if user provided sort fields and make sure they're allowed by the sortFields array
	if (query.sortBy) {
		const fieldsToSortBy = query.sortBy.toString().split(",");
		const sortOrders = query.order ? query.order.toString().split(",") : [];

		fieldsToSortBy.forEach((field: string, index: number) => {
			// Only allow sorting by fields present in the sortFields array
			if (sortFields.includes(field)) {
				sortCriteria[field] = sortOrders[index] === "asc" ? 1 : -1;
			}
		});
	}

	// If no valid sort field is provided or no valid sort fields were found, return an empty object (no sorting)
	if (Object.keys(sortCriteria).length === 0) {
		return {};
	}

	return sortCriteria;
}
