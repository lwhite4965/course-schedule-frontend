import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../ScheduleDownload/ScheduleDownload.css";
import { fetchAvailableRooms } from "../helpers/fetchFns";
import { useState } from "react";
import { Loading } from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
export const RoomAvailability = () => {
    const [selectedRoomTime, setSelectedRoomTime] = useState("8:00");
    const [selectedDay, setSelectedDay] = useState("M/W");
    const [selectedRoomTimeStore, setSelectedRoomTimeStore] = useState("");
    const [selectedDayStore, setSelectedDayStore] = useState("");
    const { data, isLoading, error, refetch, isFetched } = useQuery({
        queryKey: ["Room Availability"],
        queryFn: () => fetchAvailableRooms({
            time: selectedRoomTime,
            days: selectedDay
        }),
        refetchOnMount: false
    });
    return (_jsxs("div", { className: "courseEdit", children: [_jsx("p", { className: "helperText", children: "Select Time:" }), _jsx("div", { className: "radioLayer", children: [
                    "8:00",
                    "9:30",
                    "11:00",
                    "12:30",
                    "14:00",
                    "15:30",
                    "17:00",
                    "18:30"
                ].map((timeOption) => (_jsxs("label", { children: [_jsx("input", { className: "formOpt", type: "radio", name: "choiceGroupA", value: timeOption, checked: selectedRoomTime === timeOption, onChange: () => setSelectedRoomTime(timeOption) }), timeOption] }, timeOption))) }), _jsx("p", { className: "helperText", children: "Select Day(s):" }), _jsxs("div", { className: "courseEdit", children: [_jsx("div", { className: "radioLayer", children: ["M/W", "T/R", "F"].map((dayOption) => (_jsxs("label", { children: [_jsx("input", { className: "formOpt", type: "radio", name: "choiceGroupB", value: dayOption, checked: selectedDay === dayOption, onChange: () => setSelectedDay(dayOption) }), dayOption] }, dayOption))) }), _jsxs("button", { className: "mainButton", onClick: () => {
                            refetch();
                            setSelectedDayStore(selectedDay);
                            setSelectedRoomTimeStore(selectedRoomTime);
                        }, children: ["Fetch Room Availability - ", selectedDay, " @ ", selectedRoomTime] }), isLoading && _jsx(Loading, {}), selectedDayStore && (_jsxs("p", { className: "helperText", children: ["Rooms Available ", selectedDayStore, " @", " ", selectedRoomTimeStore] })), !isLoading && isFetched && selectedDayStore && (_jsx("div", { className: "radioLayer roomList", children: data.map((room) => (_jsx("p", { className: "roomText", children: room }))) })), _jsx("p", { className: "helperText error", children: error?.message })] })] }));
};
