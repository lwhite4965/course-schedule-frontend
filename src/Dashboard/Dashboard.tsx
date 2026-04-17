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

import { validateGeneralQueryCombo } from "../helpers/queryValidation";

export const Dashboard = () => {
	// Pull User Data from Clerk
	const { user, isLoaded } = useUser();

	// Define type for user role
	type UserRole = "Student" | "Professor" | "Course Scheduler";

	// Pull role from metadata
	const role = user?.unsafeMetadata.role as UserRole;

	// Function for setting a user's role in Clerk metadata
	const assignRole = async () => {
		if (!isLoaded || !user) return;

		user.update({
			unsafeMetadata: {
				role: selectedRole
			}
		});

		setIsRoleDialogOpen(false);
	};

	// Define type for GeneralQueryParam
	type GeneralQueryParam =
		| "Instructor"
		| "Building"
		| "Meeting Days"
		| "Faculty Ratio";

	// State for selectedRole
	const [selectedRole, setSelectedRole] = useState<UserRole>(
		role || "Student"
	);

	// State for isRoleDialogOpen
	const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(
		!role || !isLoaded
	);

	// State for selectedQueryParam - YOU CAN ONLY QUERY WITH ONE PARAM PER BACKEND CALL
	const [selectedGeneralQueryParam, setSelectedGeneralQueryParam] =
		useState<GeneralQueryParam>("Instructor");

	// State for selectedParamValue - TRACKS VALUE REGUARDLESS OF SELECTED QUERYPARAM
	const [selectedGeneralParamValue, setSelectedGeneralParamValue] =
		useState<string>("");

	// State for errorTxt
	const [errorTxt, setErrorTxt] = useState<string>("");

	// State for course edit modal visibility
	const [isCourseEditModalVisible, setIsCourseEditModalVisible] =
		useState<boolean>(false);

	// State for schedule download modal visibility
	const [isScheduleDownloadModalVisible, setIsScheduleDownloadModalVisible] =
		useState<boolean>(false);

	// State for data report modal visibility
	const [isDataReportModalVisible, setIsDataReportModalVisible] =
		useState<boolean>(false);

	// useQuery hook for general query
	const {
		data: generalQueryCourses,
		// isLoading: isGeneralQueryLoading,
		error: generalQueryError,
		refetch: refetchGeneralQuery
	} = useQuery({
		queryKey: ["General Query"],
		queryFn: () =>
			fetchGeneralCourses({
				param: selectedGeneralQueryParam,
				value: selectedGeneralParamValue
			}),
		refetchOnMount: false
	});

	//useQuery hook for ALL COURSES - AUTOMATICALLY POLLS EVERY 10s!!!!!
	const {
		data: allCourses,
		// isLoading: areAllCoursesLoading,
		error: allCoursesError
	} = useQuery({
		queryKey: ["All Courses"],
		queryFn: () =>
			fetchAllCourses().catch(() => {
				setErrorTxt(allCoursesError?.message as string);
				throw allCoursesError;
			}),
		refetchInterval: 10000
	});

	// THIS SECTION OF CODE IS ONLY USED FOR ASSIGNING A ROLE ON FIRST SIGN IN!!!!
	// RETURN DIOLOGUE FOR ROLE SELECTION IF THERE IS NONE IN USER METADATA - THIS SHOULD ONLY HAPPEN ONCE PER USER
	if (isRoleDialogOpen) {
		return (
			<div className="vertParent">
				<p className={"helperText"}>Which Role?</p>
				<form>
					{["Student", "Professor", "Course Scheduler"].map(
						(roleOption) => (
							<label key={roleOption}>
								<input
									className={"formOpt"}
									type="radio"
									name="choiceGroup"
									value={roleOption}
									checked={selectedRole === roleOption}
									onChange={() =>
										setSelectedRole(roleOption as UserRole)
									}
								/>
								{roleOption}
							</label>
						)
					)}
				</form>
				<p className="helperText">Selected: {selectedRole}</p>
				<button className="authBtn" onClick={() => assignRole()}>
					Save Role
				</button>
			</div>
		);
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
	return (
		<div className="appBg">
			<div className="horizontalLayer">
				<SignOutButton>
					<button className="mainButton">Sign Out</button>
				</SignOutButton>
				<p className="introText">
					{userEmail} - {role}{" "}
				</p>
				<button
					className="mainButton"
					onClick={() => setIsRoleDialogOpen(true)}>
					(Change Role?)
				</button>
				{role === "Course Scheduler" && (
					<button
						className="mainButton"
						onClick={() => setIsCourseEditModalVisible(true)}>
						Modify Courses
					</button>
				)}
				{role === "Professor" && (
					<button
						className="mainButton"
						onClick={() => setIsScheduleDownloadModalVisible(true)}>
						Download Schedule
					</button>
				)}
				{role === "Course Scheduler" && (
					<button
						className="mainButton"
						onClick={() => setIsDataReportModalVisible(true)}>
						Data Report
					</button>
				)}
			</div>
			<div className="horizontalLayer leftAlign">
				<p className={"introText"}>Query By?</p>
				<form>
					{[
						"Instructor",
						"Building",
						"Meeting Days",
						"Faculty Ratio"
					].map((param) => (
						<label key={param}>
							<input
								className={"formOpt"}
								type="radio"
								name="choiceGroup"
								value={param}
								checked={selectedGeneralQueryParam === param}
								onChange={() =>
									setSelectedGeneralQueryParam(
										param as GeneralQueryParam
									)
								}
							/>
							{param}
						</label>
					))}
				</form>
			</div>
			<div className="horizontalLayer leftAlign">
				<p className="introText">
					Search for which {selectedGeneralQueryParam}:
				</p>
				{["Instructor", "Building"].includes(
					selectedGeneralQueryParam
				) && (
					<input
						type="text"
						value={selectedGeneralParamValue}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setSelectedGeneralParamValue(e.target.value);
						}}
					/>
				)}
				{["Meeting Days", "Faculty Ratio"].includes(
					selectedGeneralQueryParam
				) && (
					<form>
						{selectedQueryParamOptions[
							selectedGeneralQueryParam
						].map((option) => (
							<label key={option}>
								<input
									className={"formOpt"}
									type="radio"
									name="choiceGroup"
									value={option}
									checked={
										selectedGeneralParamValue === option
									}
									onChange={() =>
										setSelectedGeneralParamValue(option)
									}
								/>
								{option}
							</label>
						))}
					</form>
				)}
				<button
					className="mainButton query"
					onClick={() => {
						if (
							validateGeneralQueryCombo({
								param: selectedGeneralQueryParam,
								value: selectedGeneralParamValue
							})
						) {
							setErrorTxt("");
							refetchGeneralQuery();
						} else {
							setErrorTxt(
								"Invalid Query Combo: " +
									selectedGeneralQueryParam +
									" + " +
									(selectedGeneralParamValue
										? selectedGeneralParamValue
										: "null")
							);
						}
					}}>
					Query Database
				</button>
				<p className="helperText error">{errorTxt}</p>
				<p className="helperText error">{generalQueryError?.message}</p>
			</div>
			<CourseDisplay
				/* Return whichever has less courses === most specialized */
				courses={generalQueryCourses ?? allCourses ?? []}
				load={true}
			/>
			<Modal
				isVisible={isCourseEditModalVisible}
				onClose={() => setIsCourseEditModalVisible(false)}>
				<CourseEdit courses={allCourses} />
			</Modal>
			<Modal
				isVisible={isScheduleDownloadModalVisible}
				onClose={() => setIsScheduleDownloadModalVisible(false)}>
				<ScheduleDownload />
			</Modal>

			<Modal
				isVisible={isDataReportModalVisible}
				onClose={() => setIsDataReportModalVisible(false)}>
				<DataReport />
			</Modal>
		</div>
	);
};

export default Dashboard;
