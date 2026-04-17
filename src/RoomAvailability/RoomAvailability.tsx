import "../ScheduleDownload/ScheduleDownload.css";
import { fetchAvailableRooms } from "../helpers/fetchFns";
import { useState } from "react";
import { Loading } from "../Loading/Loading";

export const RoomAvailability = () => {
	const [selectedRoomTime, setSelectedRoomTime] = useState<string>("8:00");
	const [selectedDay, setSelectedDay] = useState<"M/W" | "T/R" | "F">("M/W");
	const [availabilityError, setAvailabilityError] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [availableRooms, setAvailableRooms] = useState<string[]>([]);

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
						setIsLoading(true);
						fetchAvailableRooms({
							time: selectedRoomTime,
							days: selectedDay
						})
							.then((res) => {
								setAvailabilityError("");
								setAvailableRooms(res.data);
								setIsLoading(false);
							})
							.catch((err) => {
								setAvailabilityError(err.message);
								setIsLoading(false);
							});
					}}>
					Fetch Room Availability - {selectedDay} @ {selectedRoomTime}
				</button>
				{isLoading && <Loading />}
				<p className="helperText">
					Rooms Available {selectedDay} @ {selectedRoomTime}
				</p>

				<div className="radioLayer">
					{availableRooms.map((room) => (
						<p className="helperText">{room}</p>
					))}
				</div>
				<p className="helperText error">{availabilityError}</p>
			</div>
		</div>
	);
};
