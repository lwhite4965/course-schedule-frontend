import axios from "axios";

export const fetchGenericCourses = async ({
	param,
	value
}: {
	param: string;
	value: string;
}) => {
	const response = await axios.get("localhost:3000/GET/api/courses", {
		params: {
			queryParam: param,
			paramValue: value
		}
	});
	return response.data;
};
