import axios from "axios";

export const fetchAllCourses = async () => {
	const response = await axios.get("http://localhost:9517/api/all");
	return response.data;
};

export const fetchGeneralCourses = async ({
	param,
	value
}: {
	param: string;
	value: string;
}) => {
	const response = await axios.get("http://localhost:9517/api/courses", {
		params: {
			queryParam: param,
			paramValue: value
		}
	});
	return response.data;
};

export const fetchProfessorSchedule = async ({ email }: { email: string }) => {
	const response = await axios.get("http://localhost:9517/api/schedule", {
		params: {
			professorEmail: email
		}
	});
	return response.data;
};

export const fetchBadDataReport = async () => {
	const response = await axios.get("http://localhost:9517/api/report");
	return response.data;
};

export const fetchAvailableRooms = async ({
	time,
	days
}: {
	time: string;
	days: "M/W" | "T/R" | "F";
}) => {
	const response = await axios.get("http://localhost:9517/api/rooms", {
		params: {
			timeToCheck: time,
			daysToCheck: days
		}
	});
	return response.data;
};
