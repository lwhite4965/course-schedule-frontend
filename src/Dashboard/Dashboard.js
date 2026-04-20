import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./Dashboard.css";
import { useUser, SignOutButton } from "@clerk/clerk-react";
import { useState } from "react";
// import type { Course } from "../types/Course";
import { CourseDisplay } from "../CourseDisplay/CourseDisplay";
// import dummyCourses from "../helpers/dummyData";
import { fetchGeneralCourses, fetchAllCourses } from "../helpers/fetchFns";
import { useQuery } from "@tanstack/react-query";
import { Modal } from "../Modal/Modal";
import { CourseEdit } from "../CourseEditForm/CourseEdit";
import { ScheduleDownload } from "../ScheduleDownload/ScheduleDownload";
import { DataReport } from "../DataReport/DataReport";
import { RoomAvailability } from "../RoomAvailability/RoomAvailability";
import { validateGeneralQueryCombo } from "../helpers/queryValidation";
export const Dashboard = () => {
    // Pull User Data from Clerk
    const { user, isLoaded } = useUser();
    // Pull role from metadata
    const role = user?.unsafeMetadata.role;
    // Function for setting a user's role in Clerk metadata
    const assignRole = async () => {
        if (!isLoaded || !user)
            return;
        user.update({
            unsafeMetadata: {
                role: selectedRole
            }
        });
        setIsRoleDialogOpen(false);
    };
    // State for selectedRole
    const [selectedRole, setSelectedRole] = useState(role || "Student");
    // State for isRoleDialogOpen
    const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(!role || !isLoaded);
    // State for selectedQueryParam - YOU CAN ONLY QUERY WITH ONE PARAM PER BACKEND CALL
    const [selectedGeneralQueryParam, setSelectedGeneralQueryParam] = useState("Instructor");
    // State for selectedParamValue - TRACKS VALUE REGUARDLESS OF SELECTED QUERYPARAM
    const [selectedGeneralParamValue, setSelectedGeneralParamValue] = useState("");
    // State for errorTxt
    const [errorTxt, setErrorTxt] = useState("");
    // State for course edit modal visibility
    const [isCourseEditModalVisible, setIsCourseEditModalVisible] = useState(false);
    // State for schedule download modal visibility
    const [isScheduleDownloadModalVisible, setIsScheduleDownloadModalVisible] = useState(false);
    // State for data report modal visibility
    const [isDataReportModalVisible, setIsDataReportModalVisible] = useState(false);
    // State for room availability visibility
    const [isRoomAvailabilityModalVisible, setIsRoomAvailabilityModalVisible] = useState(false);
    // useQuery hook for general query
    const { data: generalQueryCourses, 
    // isLoading: isGeneralQueryLoading,
    error: generalQueryError, refetch: refetchGeneralQuery } = useQuery({
        queryKey: ["General Query"],
        queryFn: () => fetchGeneralCourses({
            param: selectedGeneralQueryParam,
            value: selectedGeneralParamValue
        }),
        refetchOnMount: false
    });
    //useQuery hook for ALL COURSES - AUTOMATICALLY POLLS EVERY 10s!!!!!
    const { data: allCourses, 
    // isLoading: areAllCoursesLoading,
    error: allCoursesError } = useQuery({
        queryKey: ["All Courses"],
        queryFn: () => fetchAllCourses().catch(() => {
            setErrorTxt(allCoursesError?.message);
            throw allCoursesError;
        }),
        refetchInterval: 10000
    });
    // THIS SECTION OF CODE IS ONLY USED FOR ASSIGNING A ROLE ON FIRST SIGN IN!!!!
    // RETURN DIOLOGUE FOR ROLE SELECTION IF THERE IS NONE IN USER METADATA - THIS SHOULD ONLY HAPPEN ONCE PER USER
    if (isRoleDialogOpen) {
        return (_jsxs("div", { className: "vertParent", children: [_jsx("p", { className: "helperText", children: "Which Role?" }), _jsx("form", { children: ["Student", "Professor", "Course Scheduler"].map((roleOption) => (_jsxs("label", { children: [_jsx("input", { className: "formOpt", type: "radio", name: "choiceGroup", value: roleOption, checked: selectedRole === roleOption, onChange: () => setSelectedRole(roleOption) }), roleOption] }, roleOption))) }), _jsxs("p", { className: "helperText", children: ["Selected: ", selectedRole] }), _jsx("button", { className: "authBtn", onClick: () => assignRole(), children: "Save Role" })] }));
    }
    // Get user's email
    const userEmail = user?.emailAddresses[0].emailAddress;
    // For multiple choice query params optins
    const selectedQueryParamOptions = {
        "Instructor": [],
        "Building": [],
        "Meeting Days": ["M/W", "T/R", "F"],
        "Faculty Ratio": ["Most Support", "Least Support"]
    };
    // RETURN THE MORE TRADITIONAL DASHBOARD, WITH UNIQUE TABS BASED ON ROLE
    return (_jsxs("div", { className: "appBg", children: [_jsxs("div", { className: "horizontalLayer", children: [_jsx(SignOutButton, { children: _jsx("button", { className: "mainButton", children: "Sign Out" }) }), _jsxs("p", { className: "introText", children: [userEmail, " - ", role, " "] }), _jsx("button", { className: "mainButton", onClick: () => setIsRoleDialogOpen(true), children: "(Change Role?)" }), role === "Course Scheduler" && (_jsx("button", { className: "mainButton", onClick: () => setIsCourseEditModalVisible(true), children: "Modify Courses" })), role === "Professor" && (_jsx("button", { className: "mainButton", onClick: () => setIsScheduleDownloadModalVisible(true), children: "Download Schedule" })), role === "Course Scheduler" && (_jsx("button", { className: "mainButton", onClick: () => setIsDataReportModalVisible(true), children: "Data Report" })), _jsx("button", { className: "mainButton", onClick: () => setIsRoomAvailabilityModalVisible(true), children: "Room Availability" })] }), _jsxs("div", { className: "horizontalLayer leftAlign", children: [_jsx("p", { className: "introText", children: "Query By?" }), _jsx("form", { children: [
                            "Instructor",
                            "Building",
                            "Meeting Days",
                            "Faculty Ratio"
                        ].map((param) => (_jsxs("label", { children: [_jsx("input", { className: "formOpt", type: "radio", name: "choiceGroup", value: param, checked: selectedGeneralQueryParam === param, onChange: () => setSelectedGeneralQueryParam(param) }), param == "Building" ? "Room" : param] }, param))) })] }), _jsxs("div", { className: "horizontalLayer leftAlign", children: [_jsxs("p", { className: "introText", children: ["Search for which", " ", selectedGeneralQueryParam == "Building"
                                ? "Room"
                                : selectedGeneralQueryParam, ":"] }), ["Instructor", "Building"].includes(selectedGeneralQueryParam) && (_jsx("input", { type: "text", value: selectedGeneralParamValue, onChange: (e) => {
                            setSelectedGeneralParamValue(e.target.value);
                        } })), ["Meeting Days", "Faculty Ratio"].includes(selectedGeneralQueryParam) && (_jsx("form", { children: selectedQueryParamOptions[selectedGeneralQueryParam].map((option) => (_jsxs("label", { children: [_jsx("input", { className: "formOpt", type: "radio", name: "choiceGroup", value: option, checked: selectedGeneralParamValue === option, onChange: () => setSelectedGeneralParamValue(option) }), option] }, option))) })), _jsx("button", { className: "mainButton query", onClick: () => {
                            if (validateGeneralQueryCombo({
                                param: selectedGeneralQueryParam,
                                value: selectedGeneralParamValue
                            })) {
                                setErrorTxt("");
                                refetchGeneralQuery();
                            }
                            else {
                                setErrorTxt("Invalid Query Combo: " +
                                    selectedGeneralQueryParam +
                                    " + " +
                                    (selectedGeneralParamValue
                                        ? selectedGeneralParamValue
                                        : "null"));
                            }
                        }, children: "Query Database" }), _jsx("p", { className: "helperText error", children: errorTxt }), _jsx("p", { className: "helperText error", children: generalQueryError?.message })] }), _jsx(CourseDisplay
            /* Return whichever has less courses === most specialized */
            , { 
                /* Return whichever has less courses === most specialized */
                courses: generalQueryCourses ?? allCourses ?? [], load: true }), _jsx(Modal, { isVisible: isCourseEditModalVisible, onClose: () => setIsCourseEditModalVisible(false), children: _jsx(CourseEdit, { courses: allCourses }) }), _jsx(Modal, { isVisible: isScheduleDownloadModalVisible, onClose: () => setIsScheduleDownloadModalVisible(false), children: _jsx(ScheduleDownload, {}) }), _jsx(Modal, { isVisible: isDataReportModalVisible, onClose: () => setIsDataReportModalVisible(false), largeModal: true, children: _jsx(DataReport, {}) }), _jsx(Modal, { isVisible: isRoomAvailabilityModalVisible, onClose: () => setIsRoomAvailabilityModalVisible(false), children: _jsx(RoomAvailability, {}) })] }));
};
export default Dashboard;
