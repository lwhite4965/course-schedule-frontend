import axios from "axios";
import type { Course } from "../types/Course";

export const postCourseDescription = async ({
	crnToModify,
	newDescription
}: {
	crnToModify: string;
	newDescription: string;
}) => {
	const response = await axios.post(
		"http://localhost:9517/api/descriptions",
		{
			crnToModify: crnToModify,
			newDescription: newDescription
		}
	);
	return response.data;
};

export const postNewCourse = async ({ newCourse }: { newCourse: Course }) => {
	const response = await axios.post("http://localhost:9517/api/courses", {
		newCourse: newCourse
	});
	return response.data;
};

export const deleteExistingCourse = async ({
	crnToDelete
}: {
	crnToDelete: string;
}) => {
	const response = await axios.post("http://localhost:9517/api/archive", {
		crnToDelete: crnToDelete
	});
	return response.data;
};
