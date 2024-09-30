// Builds the filter query for filtering by different fields
export default function buildFilterQuery(query: any, filterFields: any) {
	const filterCriteria: { [key: string]: any } = {};
	for (const field of filterFields) {
		if (query && query[field]) {
			filterCriteria[field] = query[field];
		}
	}
	if (Object.keys(filterCriteria).length > 0) {
		return { $match: filterCriteria };
	}
	return {}; // Return an empty object if no filter criteria apply
}
