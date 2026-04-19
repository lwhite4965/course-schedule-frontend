import type { Course } from "../types/Course";
import "./SingleDisplay.css";

const formatTerm = (preFormat: string): string => {
	switch (preFormat) {
		case "202501":
			return "S25";
			break;
		case "202508":
			return "F25";
			break;
		case "202601":
			return "S26";
			break;
		default:
			return "N/A";
	}
};

export const SingleDisplay = (props: { course: Course }) => {
	return (
		<div className="container">
			<div className={"cell firstCell"}>
				{formatTerm(props.course.term)} {props.course.level}
			</div>
			<div className={"cell"}>{props.course.crn}</div>
			<div className={"cell"}>{props.course.shortName}</div>
			<div className={"cell"}>{props.course.longName}</div>
			<div className={"cell"}>{props.course.section}</div>
			<div className={"cell"}>{props.course.enrollment}</div>
			<div className={"cell"}>{props.course.totalTAs}</div>
			<div
				className={`cell + ${props.course.meetingDays[0] == "N/A" ? "incomplete" : ""}`}>
				{props.course?.meetingDays}
			</div>
			<div
				className={`cell + ${props.course.meetingTimes[0] == "N/A" ? "incomplete" : ""}`}>
				{props.course?.meetingTimes[0]}{" "}
				{props.course.meetingTimes[0] == "N/A" ? "" : "-"}
				{props.course?.meetingTimes[1]}
			</div>
			<div
				className={`cell + ${props.course.meetingRoom == "N/A" ? "incomplete" : ""}`}>
				{props.course.meetingRoom}
			</div>
			<div
				className={`cell + ${props.course.instructorName == "N/A" ? "incomplete" : ""}`}>
				{props.course.instructorName}
			</div>
			<div className={"cell"}>{props.course.instructorEmail}</div>
			<div className={"cell lastCell"}>
				{props.course.courseDescription}
			</div>
		</div>
	);
};
