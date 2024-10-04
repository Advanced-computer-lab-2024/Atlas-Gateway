// Builds the sort criteria for sorting by multiple fields
export default function buildSortCriteria(query: any) {
	const sortCriteria: any = {};

	// If sort query is provided, split by comma before comma is used to sort by  and after comma is used to sort in ascending or descending order
	if (query.sort) {
		const [sortby, order] = query.sort.split(",");
		sortCriteria[sortby] = order === "-1" ? -1 : 1;
	}

	// If no valid sort field is provided or no valid sort fields were found, return an empty object (no sorting)
	if (Object.keys(sortCriteria).length === 0) {
		return {};
	}

	return sortCriteria;
}
