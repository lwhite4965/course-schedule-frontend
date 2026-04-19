import "../ScheduleDownload/ScheduleDownload.css";
import { fetchBadDataReport } from "../helpers/fetchFns";
import { useState } from "react";
import { Loading } from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { CourseDisplay } from "../CourseDisplay/CourseDisplay.tsx";

export const DataReport = () => {
	const { data, isLoading, refetch, error } = useQuery({
		queryKey: ["Data Report"],
		queryFn: () => fetchBadDataReport(),
		refetchOnMount: false
	});
	const [hasFetched, setHasFetched] = useState<boolean>(false);
	return (
		<div className="courseEdit">
			{isLoading && <Loading />}
			<button
				className="mainButton"
				onClick={() => {
					refetch().then(() => setHasFetched(true));
				}}>
				Show Bad Data
			</button>
			<p className="helperText error">{error?.message}</p>
			{!isLoading && hasFetched && (
				<CourseDisplay courses={data} load={false} />
			)}
		</div>
	);
};
