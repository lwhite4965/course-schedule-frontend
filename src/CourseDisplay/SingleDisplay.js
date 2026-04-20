import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import "./SingleDisplay.css";
const formatTerm = (preFormat) => {
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
export const SingleDisplay = (props) => {
    return (_jsxs("div", { className: "container", children: [_jsxs("div", { className: "cell firstCell", children: [formatTerm(props.course.term), " ", props.course.level] }), _jsx("div", { className: "cell", children: props.course.crn }), _jsx("div", { className: "cell", children: props.course.shortName }), _jsx("div", { className: "cell", children: props.course.longName }), _jsx("div", { className: "cell", children: props.course.section }), _jsx("div", { className: "cell", children: props.course.enrollment }), _jsx("div", { className: "cell", children: props.course.totalTAs }), _jsx("div", { className: `cell + ${props.course.meetingDays[0] == "N/A" ? "incomplete" : ""}`, children: props.course?.meetingDays }), _jsxs("div", { className: `cell + ${props.course.meetingTimes[0] == "N/A" ? "incomplete" : ""}`, children: [props.course?.meetingTimes[0], " ", props.course.meetingTimes[0] == "N/A" ? "" : "-", props.course?.meetingTimes[1]] }), _jsx("div", { className: `cell + ${props.course.meetingRoom == "N/A" ? "incomplete" : ""}`, children: props.course.meetingRoom }), _jsx("div", { className: `cell + ${props.course.instructorName == "N/A" ? "incomplete" : ""}`, children: props.course.instructorName }), _jsx("div", { className: "cell", children: props.course.instructorEmail }), _jsx("div", { className: "cell lastCell", children: props.course.courseDescription })] }));
};
