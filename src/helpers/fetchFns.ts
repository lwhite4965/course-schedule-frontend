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

export const fetchProfessorSchedule = async ({ email }: { email: string }) => {
	const response = await axios.get("localhost:3000/GET/api/schedule", {
		params: {
			professorEmail: email
		}
	});
	return response.data;
};

export const fetchBadDataReport = async () => {
	const response = await axios.get("localhost:3000/GET/api/report");
	return response.data;
};

export const fetchAvailableRooms = async ({
	time,
	days
}: {
	time: string;
	days: "M/W" | "T/R" | "F";
}) => {
	const response = await axios.get("localhost:3000/GET/api/rooms", {
		params: {
			timeToCheck: time,
			daysToCheck: days
		}
	});
	return response.data;
};
