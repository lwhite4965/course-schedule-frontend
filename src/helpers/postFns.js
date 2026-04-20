import axios from "axios";
export const postCourseDescription = async ({ crnToModify, newDescription }) => {
    const response = await axios.post("http://localhost:9517/api/descriptions", {
        crnToModify: crnToModify,
        newDescription: newDescription
    });
    return response.data;
};
export const postNewCourse = async ({ newCourse }) => {
    const response = await axios.post("http://localhost:9517/api/courses", {
        newCourse: newCourse
    });
    return response.data;
};
export const deleteExistingCourse = async ({ crnToDelete }) => {
    const response = await axios.post("http://localhost:9517/api/archive", {
        crnToDelete: crnToDelete
    });
    return response.data;
};
