import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { CourseEditForm } from "./CourseEditForm";
import { deleteExistingCourse, postCourseDescription, postNewCourse } from "../helpers/postFns";
const defaultCourse = {
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
export const CourseEdit = (props) => {
    const courses = props.courses || [];
    const [CRN, setCRN] = useState("");
    const [message, setMessage] = useState("");
    const [formVisible, setFormVisible] = useState(false);
    const [currentCourse, setCurrentCourse] = useState({
        ...defaultCourse
    });
    const [currentMode, setCurrentMode] = useState("none");
    // useMutation
    const { mutate: mutateDelete, isSuccess: isSuccessDelete, isError: isFailureDelete } = useMutation({
        mutationKey: ["DeleteCourse"],
        mutationFn: () => deleteExistingCourse({ crnToDelete: CRN })
    });
    const { mutate: mutateEdit, isSuccess: isSuccessEdit, isError: isFailureEdit } = useMutation({
        mutationKey: ["EditCourse"],
        mutationFn: (newDescription) => postCourseDescription({
            crnToModify: CRN,
            newDescription: newDescription
        })
    });
    const { mutate: mutateCreate, isSuccess: isSuccessCreate, isError: isFailureCreate } = useMutation({
        mutationKey: ["CreateCourse"],
        mutationFn: (newCourse) => postNewCourse({
            newCourse: newCourse
        })
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
    return (_jsxs("div", { className: "courseEdit", children: [_jsx("h1", { children: "Course Edit" }), _jsxs("label", { className: "fieldGroup", children: ["CRN", _jsx("input", { type: "text", name: "crn", value: CRN, onChange: (e) => setCRN(e.target.value), disabled: currentMode !== "none" })] }), _jsxs("div", { style: { display: "flex", gap: "10px" }, children: [_jsx("button", { className: "courseEditButton", onClick: onCreate, children: "Create" }), _jsx("button", { className: "courseEditButton", onClick: onEdit, children: "Edit" }), _jsx("button", { className: "courseEditButton", onClick: onDelete, children: "Delete" })] }), _jsx(CourseEditForm, { isVisible: formVisible, initialCourse: currentCourse, descOnly: currentMode === "edit", crn: CRN, onSave: currentMode === "edit" ? mutateEdit : mutateCreate }), _jsx("p", { children: message }), currentMode == "delete" && isSuccessDelete && (_jsxs("p", { children: ["Course with CRN ", CRN, " successfully deleted"] })), currentMode == "delete" && isFailureDelete && (_jsxs("p", { children: ["Course with CRN ", CRN, " couldn't be deleted"] })), currentMode == "edit" && isSuccessEdit && (_jsxs("p", { children: ["Course Description for CRN ", CRN, " successfully updated"] })), currentMode == "edit" && isFailureEdit && (_jsxs("p", { children: ["Course Description for CRN ", CRN, " couldn't be updated"] })), currentMode == "create" && isFailureCreate && (_jsxs("p", { children: ["Course with CRN ", CRN, " was successfully created"] })), currentMode == "create" && isSuccessCreate && (_jsxs("p", { children: ["Course with CRN ", CRN, " couldn't be created"] }))] }));
};
