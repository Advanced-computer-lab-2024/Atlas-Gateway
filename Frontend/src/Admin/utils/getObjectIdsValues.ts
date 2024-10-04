import axios from "axios";

const getObjectIdsValues = async (array: string[]): Promise<string[]> => {
	const result: string[] = [];
	try {
		for (const elem of array) {
			const res = await axios.get("");
			result.push(res.data);
		}
	} catch (error) {
		console.log(error);
	}
	return result;
};
