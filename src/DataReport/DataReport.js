import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../ScheduleDownload/ScheduleDownload.css";
import { fetchBadDataReport } from "../helpers/fetchFns";
import { useState } from "react";
import { Loading } from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { CourseDisplay } from "../CourseDisplay/CourseDisplay";
export const DataReport = () => {
    const { data, isLoading, refetch, error } = useQuery({
        queryKey: ["Data Report"],
        queryFn: () => fetchBadDataReport(),
        refetchOnMount: false
    });
    const [hasFetched, setHasFetched] = useState(false);
    return (_jsxs("div", { className: "courseEdit", children: [isLoading && _jsx(Loading, {}), _jsx("button", { className: "mainButton", onClick: () => {
                    refetch().then(() => setHasFetched(true));
                }, children: "Show Bad Data" }), _jsx("p", { className: "helperText error", children: error?.message }), !isLoading && hasFetched && (_jsx(CourseDisplay, { courses: data, load: false }))] }));
};
