import axios from "axios";
import type { Course } from "../types/Course";

export const postCourseDescription = async ({
	crn,
	newDescription
}: {
	crn: string;
	newDescription: string;
}) => {
	const response = await axios.post(
		"http://localhost:9517/api/descriptions",
		{
			body: {
				crnToModify: crn,
				newDescription: newDescription
			}
		}
	);
	return response.data;
};

export const postNewCourse = async ({ newCourse }: { newCourse: Course }) => {
	const response = await axios.post("http://localhost:9517/api/courses", {
		body: {
			newCourse: newCourse
		}
	});
	return response.data;
};

export const deleteExistingCourse = async ({
	crnToDelete
}: {
	crnToDelete: string;
}) => {
	const response = await axios.post("http://localhost:9517/api/archive", {
		body: {
			crn: crnToDelete
		}
	});
	return response.data;
};
