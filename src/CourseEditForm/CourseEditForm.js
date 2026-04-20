import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import "./CourseEditForm.css";
export const CourseEditForm = (props) => {
    const localInitialCourse = { ...props.initialCourse };
    localInitialCourse.crn = props.crn;
    const [course, setCourse] = useState(localInitialCourse);
    const [editDesc, setEditDesc] = useState("");
    if (!props.isVisible)
        return null;
    const formOptions = {
        "Term": {
            altName: "term",
            inputType: "radio",
            options: ["S25", "F25", "S26"]
        },
        "Level": {
            altName: "level",
            inputType: "radio",
            options: ["UG", "GR"]
        },
        "Section": { altName: "section", inputType: "text", options: null },
        "Short Name": {
            altName: "shortName",
            inputType: "text",
            options: null
        },
        "Long Name": { altName: "longName", inputType: "text", options: null },
        "Enrollment": {
            altName: "enrollment",
            inputType: "number",
            options: null
        },
        "Total TAs": {
            altName: "totalTAs",
            inputType: "number",
            options: null
        },
        "Meeting Room": {
            altName: "meetingRoom",
            inputType: "text",
            options: null
        },
        "Meeting Days": {
            altName: "meetingDays",
            inputType: "radio",
            options: [["M", "W"], ["T", "R"], ["F"]]
        },
        "Meeting Times": {
            altName: "meetingTimes",
            inputType: "multiText",
            options: null
        },
        "Instructor Name": {
            altName: "instructorName",
            inputType: "text",
            options: null
        },
        "Instructor Email": {
            altName: "instructorEmail",
            inputType: "email",
            options: null
        },
        "Course Description": {
            altName: "courseDescription",
            inputType: "text",
            options: null
        }
    };
    if (props.descOnly) {
        return (_jsxs("form", { style: {
                display: "flex",
                flexDirection: "column",
                gap: "10px"
            }, onSubmit: (e) => {
                e.preventDefault();
                props.onSave(editDesc);
            }, children: [_jsxs("label", { className: "descLabel", children: ["Course Description", _jsx("input", { type: "text", name: "desc", value: editDesc, onChange: (e) => setEditDesc(e.target.value), className: "descInput" })] }, "Description"), _jsx("button", { className: "courseEditButton", type: "submit", children: "Save Course" })] }));
    }
    return (_jsxs("form", { style: { display: "flex", flexDirection: "column", gap: "10px" }, onSubmit: (e) => {
            e.preventDefault();
            props.onSave(course);
            console.log(course);
        }, children: [_jsx("div", { className: "courseEditList", children: Object.entries(formOptions).map(([name, { altName, inputType, options }]) => {
                    const selectedOption = course[altName];
                    return (_jsxs("label", { className: "fieldGroup", children: [name, inputType === "radio" && (_jsx("div", { children: options?.map((option) => (_jsxs("label", { children: [option, _jsx("input", { type: inputType, name: altName, value: option, defaultChecked: (Array.isArray(selectedOption) &&
                                                selectedOption.toString() ===
                                                    option.toString()) ||
                                                selectedOption ===
                                                    option, onChange: (e) => setCourse((prevCourse) => ({
                                                ...prevCourse,
                                                [altName]: e.target
                                                    .value
                                            })) })] }, option.toString()))) })), inputType === "multiText" && (_jsx("div", { className: "courseEditMultiText", children: selectedOption.map((value, i) => {
                                    return (_jsx("input", { type: "text", name: altName + i, defaultValue: value, onChange: (e) => setCourse((prevCourse) => {
                                            const updatedValue = [
                                                ...prevCourse[altName]
                                            ];
                                            updatedValue[i] =
                                                e.target.value;
                                            return {
                                                ...prevCourse,
                                                [altName]: updatedValue
                                            };
                                        }) }, i));
                                }) })), inputType !== "radio" &&
                                inputType !== "multiText" && (_jsx("input", { type: inputType, name: altName, defaultValue: selectedOption, onChange: (e) => setCourse((prevCourse) => ({
                                    ...prevCourse,
                                    [altName]: e.target.value
                                })) }))] }));
                }) }), _jsx("button", { className: "courseEditButton", type: "submit", children: "Save Course" })] }));
};
