import "../ScheduleDownload/ScheduleDownload.css";
import { fetchAvailableRooms } from "../helpers/fetchFns";
import { useState } from "react";
import { Loading } from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";

export const RoomAvailability = () => {
	const [selectedRoomTime, setSelectedRoomTime] = useState<string>("8:00");
	const [selectedDay, setSelectedDay] = useState<"M/W" | "T/R" | "F">("M/W");
	const [selectedRoomTimeStore, setSelectedRoomTimeStore] =
		useState<string>("");
	const [selectedDayStore, setSelectedDayStore] = useState<
		"M/W" | "T/R" | "F" | ""
	>("");
	const { data, isLoading, error, refetch, isFetched } = useQuery({
		queryKey: ["Room Availability"],
		queryFn: () =>
			fetchAvailableRooms({
				time: selectedRoomTime,
				days: selectedDay
			}),
		refetchOnMount: false
	});

	return (
		<div className="courseEdit">
			<p className="helperText">Select Time:</p>
			<div className="radioLayer">
				{[
					"8:00",
					"9:30",
					"11:00",
					"12:30",
					"14:00",
					"15:30",
					"17:00",
					"18:30"
				].map((timeOption) => (
					<label key={timeOption}>
						<input
							className={"formOpt"}
							type="radio"
							name="choiceGroupA"
							value={timeOption}
							checked={selectedRoomTime === timeOption}
							onChange={() => setSelectedRoomTime(timeOption)}
						/>
						{timeOption}
					</label>
				))}
			</div>
			<p className="helperText">Select Day(s):</p>
			<div className="courseEdit">
				<div className="radioLayer">
					{["M/W", "T/R", "F"].map((dayOption) => (
						<label key={dayOption}>
							<input
								className={"formOpt"}
								type="radio"
								name="choiceGroupB"
								value={dayOption}
								checked={selectedDay === dayOption}
								onChange={() =>
									setSelectedDay(
										dayOption as "M/W" | "T/R" | "F"
									)
								}
							/>
							{dayOption}
						</label>
					))}
				</div>
				<button
					className="mainButton"
					onClick={() => {
						refetch();
						setSelectedDayStore(selectedDay);
						setSelectedRoomTimeStore(selectedRoomTime);
					}}>
					Fetch Room Availability - {selectedDay} @ {selectedRoomTime}
				</button>
				{isLoading && <Loading />}
				{selectedDayStore && (
					<p className="helperText">
						Rooms Available {selectedDayStore} @{" "}
						{selectedRoomTimeStore}
					</p>
				)}
				{!isLoading && isFetched && selectedDayStore && (
					<div className="radioLayer roomList">
						{data.map((room: string) => (
							<p className="roomText">{room}</p>
						))}
					</div>
				)}

				<p className="helperText error">{error?.message}</p>
			</div>
		</div>
	);
};
