import type { Course } from "../types/Course";
import { SingleDisplay } from "./SingleDisplay";
import "./SingleDisplay.css";
import { useState } from "react";
import { Loading } from "../Loading/Loading";

export const CourseDisplay = (props: { courses: Course[]; load?: boolean }) => {
	const pageLength = 10;
	const [currentPage, setCurrentPage] = useState(1);
	const totalPages = Math.max(
		1,
		Math.ceil(props.courses.length / pageLength)
	);
	const startIndex = (currentPage - 1) * pageLength;
	const currentCourses = props.courses.slice(
		startIndex,
		startIndex + pageLength
	);

	return (
		<div className="flexParent">
			<div className="container">
				<div className={"cell headCell firstCell"}>Term</div>
				<div className={"cell headCell"}>CRN</div>
				<div className={"cell headCell"}>Subject</div>
				<div className={"cell headCell"}>Full Name</div>
				<div className={"cell headCell"}>SEC</div>
				<div className={"cell headCell"}>Students</div>
				<div className={"cell headCell"}>TAs</div>
				<div className={`cell headCell`}>{`Day(s)`}</div>
				<div className={`cell headCell`}>{`Time(s)`}</div>
				<div className={`cell headCell`}>Room #</div>
				<div className={"cell headCell"}>Prof Name</div>
				<div className={"cell headCell"}>Prof Email</div>
				<div className={"cell headCell lastCell"}>
					Course Description
				</div>
			</div>
			{currentCourses.map((course) => {
				return <SingleDisplay course={course}></SingleDisplay>;
			})}
			{props.load == true && currentCourses.length < 1 ? (
				<Loading />
			) : null}
			<div className="pagRow">
				<button
					disabled={currentPage === 1}
					onClick={() => setCurrentPage(currentPage - 1)}
					className="pagButton">
					Previous
				</button>
				<span className="helperText">
					Page {currentPage} of {totalPages}
				</span>
				<button
					disabled={currentPage === totalPages}
					onClick={() => setCurrentPage(currentPage + 1)}
					className="pagButton">
					Next
				</button>
			</div>
		</div>
	);
};
