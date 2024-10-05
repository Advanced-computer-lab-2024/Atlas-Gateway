import { PipelineStage } from "mongoose";

// Builds the search query for fuzzy search
export default function search(
	keyword: string,
	options: string[] = [],
): PipelineStage[] {
	const pipeline: PipelineStage[] = [];

	if (keyword) {
		if (Array.isArray(options)) {
			pipeline.push({
				$match: {
					$or: options.map((option) => {
						let nestedMatch = {};
						nestedMatch = {
							[option as string]: {
								$regex: new RegExp(escapeRegex(keyword), "gi"),
							},
						};

						return nestedMatch;
					}),
				},
			});
		}
	}

	return pipeline;
}
// Helper function to escape regex characters
const escapeRegex = (str: string) => {
	return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
