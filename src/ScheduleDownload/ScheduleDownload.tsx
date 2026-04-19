import "./ScheduleDownload";
import { downloadCoursesPDF } from "../helpers/generatePdf";
import { fetchProfessorSchedule } from "../helpers/fetchFns";
import { useState } from "react";
import { Loading } from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";

export const ScheduleDownload = () => {
	const [emailForSchedule, setEmailForSchedule] = useState<string>("");
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ["Prof Schedule"],
		queryFn: () => fetchProfessorSchedule({ email: emailForSchedule }),
		refetchOnMount: false
	});
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
					refetch().then(() => downloadCoursesPDF(data));
				}}>
				Get Schedule PDF
			</button>
			<p className="helperText error">{error?.message}</p>
		</div>
	);
};
