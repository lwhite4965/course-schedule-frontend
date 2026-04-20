import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SingleDisplay } from "./SingleDisplay";
import "./SingleDisplay.css";
import { useState } from "react";
import { Loading } from "../Loading/Loading";
export const CourseDisplay = (props) => {
    const pageLength = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.max(1, Math.ceil(props.courses.length / pageLength));
    const startIndex = (currentPage - 1) * pageLength;
    const currentCourses = props.courses.slice(startIndex, startIndex + pageLength);
    return (_jsxs("div", { className: "flexParent", children: [_jsxs("div", { className: "container", children: [_jsx("div", { className: "cell headCell firstCell", children: "Term" }), _jsx("div", { className: "cell headCell", children: "CRN" }), _jsx("div", { className: "cell headCell", children: "Subject" }), _jsx("div", { className: "cell headCell", children: "Full Name" }), _jsx("div", { className: "cell headCell", children: "SEC" }), _jsx("div", { className: "cell headCell", children: "Students" }), _jsx("div", { className: "cell headCell", children: "TAs" }), _jsx("div", { className: `cell headCell`, children: `Day(s)` }), _jsx("div", { className: `cell headCell`, children: `Time(s)` }), _jsx("div", { className: `cell headCell`, children: "Room #" }), _jsx("div", { className: "cell headCell", children: "Prof Name" }), _jsx("div", { className: "cell headCell", children: "Prof Email" }), _jsx("div", { className: "cell headCell lastCell", children: "Course Description" })] }), currentCourses.map((course) => {
                return _jsx(SingleDisplay, { course: course });
            }), props.load == true && currentCourses.length < 1 ? (_jsx(Loading, {})) : null, _jsxs("div", { className: "pagRow", children: [_jsx("button", { disabled: currentPage === 1, onClick: () => setCurrentPage(currentPage - 1), className: "pagButton", children: "Previous" }), _jsxs("span", { className: "helperText", children: ["Page ", currentPage, " of ", totalPages] }), _jsx("button", { disabled: currentPage === totalPages, onClick: () => setCurrentPage(currentPage + 1), className: "pagButton", children: "Next" })] })] }));
};
