import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./ScheduleDownload";
import { downloadCoursesPDF } from "../helpers/generatePdf";
import { fetchProfessorSchedule } from "../helpers/fetchFns";
import { useState } from "react";
import { Loading } from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
export const ScheduleDownload = () => {
    const [emailForSchedule, setEmailForSchedule] = useState("");
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["Prof Schedule"],
        queryFn: () => fetchProfessorSchedule({ email: emailForSchedule }),
        refetchOnMount: false
    });
    return (_jsxs("div", { className: "courseEdit", children: [_jsx("p", { className: "helperText", children: "Enter Email:" }), _jsx("input", { type: "text", value: emailForSchedule, onChange: (e) => setEmailForSchedule(e.target.value) }), isLoading && _jsx(Loading, {}), _jsx("button", { className: "mainButton", onClick: () => {
                    refetch().then(() => downloadCoursesPDF(data));
                }, children: "Get Schedule PDF" }), _jsx("p", { className: "helperText error", children: error?.message })] }));
};
