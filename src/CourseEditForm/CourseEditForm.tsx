import { useState } from "react";
import type { Course } from "../types/Course";
import "./CourseEditForm.css";

export const CourseEditForm = (props: {isVisible: boolean, initialCourse?: Course, onSave: (course: Course) => void}) => {
    if (!props.isVisible) return null;
    const [course, setCourse] = useState<Course>(props.initialCourse as Course);

    function updateCourse(field: keyof Course, value: string | number | string[]) {
        setCourse((prevCourse) => ({...prevCourse,[field]: value}));
    }

    const formOptions = {
        "Term": {altName: "term", inputType: "radio", options: ["S25", "F25", "S26"]},
        "Level": {altName: "level", inputType: "radio", options: ["UG", "GR"]},
        "Section": {altName: "section", inputType: "text", options: null},
        "Short Name": {altName: "shortName", inputType: "text", options: null},
        "Long Name": {altName: "longName", inputType: "text", options: null},
        "Enrollment": {altName: "enrollment", inputType: "number", options: null},
        "Total TAs": {altName: "totalTAs", inputType: "number", options: null},
        "Meeting Room": {altName: "meetingRoom", inputType: "text", options: null},
        "Meeting Days": {altName: "meetingDays", inputType: "radio", options: [["M", "W"], ["T", "R"], ["F"]]},
        "Meeting Times": {altName: "meetingTimes", inputType: "multiText", options: null},
        "Instructor Name": {altName: "instructorName", inputType: "text", options: null},
        "Instructor Email": {altName: "instructorEmail", inputType: "email", options: null},
        "Course Description": {altName: "courseDescription", inputType: "text", options: null}
    }

    return (
        <form
            style={{display: "flex", flexDirection: "column", gap: "10px"}}
            onSubmit={(e) => { e.preventDefault(); props.onSave(course); }}>

            <div className="courseEditList">
                {Object.entries(formOptions).map(([name, { altName, inputType, options }]) => {
                    const selectedOption = course[altName as keyof Course];

                    return <label className="fieldGroup">{name}
                        {inputType === "radio" &&
                            <div>
                                {options?.map((option) => (
                                    console.log("Selected Option for " + name + ": ", selectedOption, "Current Option: ", option),
                                    <label key={option.toString()}>
                                        {option}
                                        <input
                                        type={inputType}
                                        name={altName}
                                        value={option}
                                        defaultChecked={Array.isArray(selectedOption) && selectedOption.toString() === option.toString() || selectedOption === option}
                                        onChange={(e) => updateCourse(altName as keyof Course, e.target.value)}
                                        />
                                    </label>
                                ))}
                            </div>
                        }
                        {inputType === "multiText" &&
                            <div className="courseEditMultiText">
                                {(selectedOption as string[]).map((value, i) => {
                                    return <input key={i} type="text" name={altName + i} defaultValue={value} onChange={(e) => updateCourse(altName as keyof Course, e.target.value)} />;
                                })}
                            </div>
                        }
                        {inputType !== "radio" && inputType !== "multiText" && 
                            <input type={inputType} name={altName} defaultValue={selectedOption} onChange={(e) => updateCourse(altName as keyof Course, e.target.value)} />
                        }
                    </label>
                })}
            </div>

            <button className="courseEditButton" type="submit">Save Course</button>
        </form>
    );
};