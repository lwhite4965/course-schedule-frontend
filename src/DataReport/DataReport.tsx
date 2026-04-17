import "../ScheduleDownload/ScheduleDownload.css";
import { fetchBadDataReport } from "../helpers/fetchFns";
import { useState } from "react";
import { Loading } from "../Loading/Loading";
import { CourseDisplay } from "../CourseDisplay/CourseDisplay.tsx";
import type { Course } from "../types/Course.ts";

export const DataReport = () => {
	const [badCourses, setBadCourses] = useState<Course[]>([]);
	const [reportError, setReportError] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	return (
		<div className="courseEdit">
			{isLoading && <Loading />}
			<button
				className="mainButton"
				onClick={() => {
					setIsLoading(true);
					fetchBadDataReport()
						.then((res) => {
							setBadCourses(res.data);
							setReportError("");
							setIsLoading(false);
						})
						.catch((err) => {
							setReportError(err.message);
							setIsLoading(false);
						});
				}}>
				Show Bad Data
			</button>
			<p className="helperText error">{reportError}</p>
			{!isLoading && <CourseDisplay courses={badCourses} load={false} />}
		</div>
	);
};
