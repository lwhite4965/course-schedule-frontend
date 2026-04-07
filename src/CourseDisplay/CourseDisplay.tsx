import type { Course } from "../types/Course";
import { SingleDisplay } from "./SingleDisplay.tsx";
import "./SingleDisplay.css";

export const CourseDisplay = (props: { courses: Course[] }) => {
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
			{props.courses.map((course) => {
				return <SingleDisplay course={course}></SingleDisplay>;
			})}
		</div>
	);
};
