import type { Course } from "../types/Course";
import "./CourseEditModal.css";

type CourseEditModalProps = {
    isVisible: boolean;
    initialCourse?: Course;
    onSave?: (course: Course) => void;
    onClose?: () => void;
};

const defaultCourse: Course = {
    term: "S25",
    level: "UG",
    section: "001",
    crn: "00000",
    shortName: "CIS 0000",
    longName: "New Course",
    enrollment: 0,
    totalTAs: 0,
    meetingRoom: "N/A",
    meetingDays: ["MW"],
    meetingTimes: ["N/A", "N/A"],
    instructorName: "",
    instructorEmail: "",
    courseDescription: ""
};

const termOptions: Course["term"][] = ["S25", "F25", "S26"];
const levelOptions: Course["level"][] = ["UG", "GR"];
const meetingDayOptions: Course["meetingDays"][number][] = ["MW", "TR", "F"];

export const CourseEditModal = ({
    isVisible,
    initialCourse,
    onSave,
    onClose
}: CourseEditModalProps) => {
    if (!isVisible) return;

    const course = initialCourse ?? defaultCourse;

    const optionsElement = (name: string, inputType:string, selectedValue: string | string[] | number, options?: string[]) => {
        return (
            <label className="fieldGroup">{name}
                {inputType === "radio" &&
                    <div>
                        {options?.map((option) => (
                            <label key={option}>
                                {option}
                                <input
                                type={inputType}
                                name={name}
                                value={option}
                                defaultChecked={selectedValue === option}
                                />
                            </label>
                        ))}
                    </div>
                }
                {inputType === "multiText" &&
                    <div>
                        {(selectedValue as string[]).map((value, i) => {
                            return <input key={i} type="text" name={name + i} defaultValue={value}/>;
                        })}
                    </div>
                }
                {inputType !== "radio" && inputType !== "multiText" && 
                    <input type={inputType} name={name} defaultValue={selectedValue} />
                }
            </label>
        )
    };

    return (
        <div className="courseEditOverlay">
            <form
                className="courseEditModal"
                onSubmit={(e) => {
                    e.preventDefault();
                    const formElements = e.target.elements as HTMLFormControlsCollection;
                    const newCourse: Course = {
                        term: (formElements.namedItem("term") as HTMLInputElement).value as Course["term"],
                        level: (formElements.namedItem("level") as HTMLInputElement).value as Course["level"],
                        section: (formElements.namedItem("section") as HTMLInputElement).value,
                        crn: (formElements.namedItem("crn") as HTMLInputElement).value,
                        shortName: (formElements.namedItem("shortName") as HTMLInputElement).value,
                        longName: (formElements.namedItem("longName") as HTMLInputElement).value,
                        enrollment: parseInt((formElements.namedItem("enrollment") as HTMLInputElement).value, 10),
                        totalTAs: parseInt((formElements.namedItem("totalTAs") as HTMLInputElement).value, 10),
                        meetingRoom: (formElements.namedItem("meetingRoom") as HTMLInputElement).value,
                        meetingDays: (formElements.namedItem("meetingDays") as HTMLInputElement).value.split(","),
                        meetingTimes: [
                            (formElements.namedItem("meetingTimeStart") as HTMLInputElement).value,
                            (formElements.namedItem("meetingTimeEnd") as HTMLInputElement).value
                        ],
                        instructorName: (formElements.namedItem("instructorName") as HTMLInputElement).value,
                        instructorEmail: (formElements.namedItem("instructorEmail") as HTMLInputElement).value,
                        courseDescription: (formElements.namedItem("courseDescription") as HTMLInputElement).value
                    };
                    onSave && onSave(newCourse);
                }}>
                <h2>Edit Course</h2>

                <div className="courseEditList">
                    {optionsElement("Term", "radio", course.term, termOptions)}
                    {optionsElement("Level", "radio", course.level, levelOptions)}
                    {optionsElement("Section", "text", course.section)}
                    {optionsElement("CRN", "text", course.crn)}
                    {optionsElement("Short Name", "text", course.shortName)}
                    {optionsElement("Long Name", "text", course.longName)}
                    {optionsElement("Enrollment", "number", course.enrollment)}
                    {optionsElement("Total TAs", "number", course.totalTAs)}
                    {optionsElement("Meeting Room", "text", course.meetingRoom)}
                    {optionsElement("Meeting Days", "text", course.meetingDays.join(","), meetingDayOptions)}
                    {optionsElement("Meeting Time", "multitext", course.meetingTimes)}
                    {optionsElement("Instructor Name", "text", course.instructorName)}
                    {optionsElement("Instructor Email", "email", course.instructorEmail)}
                    {optionsElement("Course Description", "text", course.courseDescription || "")}
                </div>

                <div>
                    <button onClick={onClose}>Cancel</button>
                    <button type="submit">Save Course</button>
                </div>
            </form>
        </div>
    );
};