import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { CourseEditForm } from "./CourseEditForm";
import type { Course } from "../types/Course";
import {
	deleteExistingCourse,
	postCourseDescription,
	postNewCourse
} from "../helpers/postFns";

const defaultCourse: Course = {
	term: "S25",
	level: "UG",
	section: "",
	crn: "",
	shortName: "",
	longName: "",
	enrollment: 0,
	totalTAs: 0,
	meetingRoom: "",
	meetingDays: ["M", "W"],
	meetingTimes: ["", ""],
	instructorName: "",
	instructorEmail: "",
	courseDescription: ""
};

export const CourseEdit = (props: { courses: Course[] }) => {
	const courses = props.courses || [];
	const [CRN, setCRN] = useState("");
	const [message, setMessage] = useState("");
	const [formVisible, setFormVisible] = useState(false);
	const [currentCourse, setCurrentCourse] = useState<Course>({
		...defaultCourse
	});
	const [currentMode, setCurrentMode] = useState<
		"create" | "edit" | "delete" | "none"
	>("none");

	// useMutation
	const {
		mutate: mutateDelete,
		isSuccess: isSuccessDelete,
		isError: isFailureDelete
	} = useMutation({
		mutationKey: ["DeleteCourse"],
		mutationFn: () => deleteExistingCourse({ crnToDelete: CRN })
	});

	const onCreate = () => {
		setFormVisible(false);
		setMessage("");
		const courseToCreate = courses.find((course) => course.crn === CRN);

		if (courseToCreate) {
			setMessage("Course with CRN " + CRN + " already exists");
			return;
		}

		setCurrentMode("create");
		setCurrentCourse((prevCourse) => ({ ...prevCourse, crn: CRN }));
		setFormVisible(true);
	};

	const onEdit = () => {
		setFormVisible(false);
		setMessage("");
		const courseToEdit = courses.find((course) => course.crn === CRN);

		if (!courseToEdit) {
			setMessage("Course with CRN " + CRN + " not found");
			return;
		}

		setCurrentMode("edit");
		setCurrentCourse(courseToEdit);
		setFormVisible(true);
	};

	const onDelete = () => {
		setFormVisible(false);
		setMessage("");
		const courseToDelete = courses.find((course) => course.crn === CRN);

		if (!courseToDelete) {
			setMessage("Course with CRN " + CRN + " not found");
			return;
		}

		setCurrentMode("delete");
		mutateDelete();
	};

	return (
		<div className="courseEdit">
			<h1>Course Edit</h1>
			<label className="fieldGroup">
				CRN
				<input
					type="text"
					name="crn"
					value={CRN}
					onChange={(e) => setCRN(e.target.value)}
					disabled={currentMode !== "none"}
				/>
			</label>
			<div style={{ display: "flex", gap: "10px" }}>
				<button className="courseEditButton" onClick={onCreate}>
					Create
				</button>
				<button className="courseEditButton" onClick={onEdit}>
					Edit
				</button>
				<button className="courseEditButton" onClick={onDelete}>
					Delete
				</button>
			</div>
			<CourseEditForm
				isVisible={formVisible}
				initialCourse={currentCourse}
				onSave={(newCourse) => {
					if (currentMode === "edit") {
						postCourseDescription({
							crn: CRN,
							newDescription: newCourse.courseDescription || ""
						})
							.then(() => {
								setMessage(
									"Successfully edited course with CRN " + CRN
								);
								setCurrentMode("none");
							})
							.catch(() => {
								setMessage(
									"Failed to edit course with CRN " + CRN
								);
							});
						return;
					} else if (currentMode === "create") {
						postNewCourse({ newCourse })
							.then(() => {
								setMessage(
									"Successfully created course with CRN " +
										newCourse.crn
								);
								setCurrentMode("none");
							})
							.catch(() => {
								setMessage(
									"Failed to create course with CRN " +
										newCourse.crn
								);
							});
					}
				}}
			/>
			<p>{message}</p>
			{currentMode == "delete" && isSuccessDelete && (
				<p>Course with CRN {CRN} successfully deleted</p>
			)}
			{currentMode == "delete" && isFailureDelete && (
				<p>Course with CRN {CRN} couldn't be deleted</p>
			)}
		</div>
	);
};
