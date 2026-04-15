import "./ScheduleDownload";
import { downloadCoursesPDF } from "../helpers/generatePdf";
import { fetchProfessorSchedule } from "../helpers/fetchFns";
import { useState } from "react";
import { Loading } from "../Loading/Loading";

export const ScheduleDownload = () => {
	const [emailForSchedule, setEmailForSchedule] = useState<string>("");
	const [scheduleDownloadError, setScheduleDownloadError] =
		useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	return (
		<div className="courseEdit">
			<p className="helperText">Enter Email:</p>
			<input
				type="text"
				value={emailForSchedule}
				onChange={(e) => setEmailForSchedule(e.target.value)}></input>
			{isLoading && <Loading />}
			<button
				className="mainButton"
				onClick={() => {
					setIsLoading(true);
					fetchProfessorSchedule({
						email: emailForSchedule
					})
						.then((res) => {
							downloadCoursesPDF(res.body);
							setScheduleDownloadError("");
							setIsLoading(false);
						})
						.catch((err) => {
							setScheduleDownloadError(err.message);
							setIsLoading(false);
						});
				}}>
				Get Schedule PDF
			</button>
			<p className="helperText error">{scheduleDownloadError}</p>
		</div>
	);
};
