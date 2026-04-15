import "./Dashboard.css";
import { useUser, SignOutButton } from "@clerk/clerk-react";
import { useState } from "react";
import type { Course } from "../types/Course";
import { CourseDisplay } from "../CourseDisplay/CourseDisplay";
import { faker } from "@faker-js/faker";
import { fetchGenericCourses } from "../helpers/fetchFns";
import { useQuery } from "@tanstack/react-query";
import { downloadCoursesPDF } from "../helpers/generatePdf";
import { Modal } from "../Modal/Modal";
import { CourseEdit } from "../CourseEditForm/CourseEdit";

export const Dashboard = () => {
	// Pull User Data from Clerk
	const { user, isLoaded } = useUser();

	// Define type for user role
	type UserRole = "Student" | "Professor" | "Course Scheduler";

	// Define type for QueryParam
	type QueryParam =
		| "Instructor"
		| "Building"
		| "Meeting Days"
		| "Faculty Ratio";

	// Pull role from metadata - no need for state as this never changes once set
	const role = user?.unsafeMetadata.role as UserRole;

	// State for selectedRole
	const [selectedRole, setSelectedRole] = useState<UserRole>("Student");

	// State for isRoleDialogOpen
	const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(
		!role || !isLoaded
	);

	// State for errorTxt
	const [errorTxt, setErrorTxt] = useState<string>("");

	// State for selectedQueryParam - YOU CAN ONLY QUERY WITH ONE PARAM PER BACKEND CALL
	const [selectedQueryParam, setSelectedQueryParam] =
		useState<QueryParam>("Instructor");

	// State for selectedParamValue - TRACKS VALUE REGUARDLESS OF SELECTED QUERYPARAM
	const [selectedParamValue, setSelectedParamValue] = useState<string>("");

	// State for course edit modal visibility
	const [isCourseEditModalVisible, setIsCourseEditModalVisible] = useState<boolean>(true);

	// Validation function that accepts selecterQueryParam and selectedParamValue and returns true if it is a valid combo for fetching
	const validateGenericQueryCombo = (): boolean => {
		switch (selectedQueryParam) {
			case "Instructor":
				return selectedParamValue.length > 0;
				break;

			case "Building":
				return selectedParamValue.length > 0;
				break;

			case "Meeting Days":
				return ["M/W", "T/R", "F"].includes(selectedParamValue);
				break;
			case "Faculty Ratio":
				return ["Most Support", "Least Support"].includes(
					selectedParamValue
				);

			default:
				return false;
		}
	};

	// useQuery hook for general query
	const {
		data: generalQueryCourses,
		isLoading: isGeneralQueryLoading,
		error: generalQueryError,
		refetch: refetchGeneralQuery
	} = useQuery({
		queryKey: ["General Query"],
		queryFn: () =>
			fetchGenericCourses({
				param: selectedQueryParam,
				value: selectedParamValue
			})
	});

	// Dummy Data just to set up Frontend
	const TERMS: Course["term"][] = ["S25", "F25", "S26"];
	const LEVELS: Course["level"][] = ["UG", "GR"];
	const MEETING_DAYS: Course["meetingDays"][] = [
		["M", "W"],
		["T", "R"],
		["F"]
	];

	// Establish dummyCourses and initialize state
	const dummyCourses: Course[] = [];

	for (let i = 0; i < 30; i++) {
		dummyCourses.push({
			term: faker.helpers.arrayElement(TERMS),
			level: faker.helpers.arrayElement(LEVELS),
			section: faker.string.numeric(3),
			crn: faker.string.numeric(5),
			shortName: `${faker.string.alpha({ length: 3, casing: "upper" })} ${faker.string.numeric(4)}`,
			longName: faker.helpers.arrayElement([
				"Data Structures",
				"Software Engineering",
				"Operating Systems",
				"Database Design"
			]),
			enrollment: faker.number.int({ min: 10, max: 100 }),
			totalTAs: faker.number.int({ min: 0, max: 5 }),
			meetingRoom: `${faker.string.alpha({ length: 3, casing: "upper" })} ${faker.string.numeric(3)}`,
			meetingDays: faker.helpers.arrayElement(MEETING_DAYS),
			meetingTimes: [
				`${faker.number.int({ min: 8, max: 15 })}:00`,
				`${faker.number.int({ min: 16, max: 22 })}:00`
			],
			instructorName: faker.person.fullName(),
			instructorEmail: faker.internet.email(),
			courseDescription: faker.lorem.sentence()
		});
	}

	// State for coursesToDisplay - these are what we pass to CourseDisplay
	const [coursesToDisplay, setCoursesToDisplay] =
		useState<Course[]>(dummyCourses);

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
					<button
						className="mainButton"
						onClick={() => setIsRoleDialogOpen(true)}>
						(Change?)
					</button>
				</p>
				{role === "Professor" && (
					<button
						className="mainButton"
						onClick={() =>
							downloadCoursesPDF([
								dummyCourses[0],
								dummyCourses[1],
								dummyCourses[2],
								dummyCourses[3],
								dummyCourses[4]
							])
						}>
						Download Schedule
					</button>
				)}
				{role === "Course Scheduler" && (
					<button
						className="mainButton"
						onClick={() => setIsCourseEditModalVisible(true)}>
						Create Course
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
								checked={selectedQueryParam === param}
								onChange={() =>
									setSelectedQueryParam(param as QueryParam)
								}
							/>
							{param}
						</label>
					))}
				</form>
			</div>
			<div className="horizontalLayer leftAlign">
				<p className="introText">
					Search for which {selectedQueryParam}:
				</p>
				{["Instructor", "Building"].includes(selectedQueryParam) && (
					<input
						type="text"
						value={selectedParamValue}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setSelectedParamValue(e.target.value);
						}}
					/>
				)}
				{["Meeting Days", "Faculty Ratio"].includes(
					selectedQueryParam
				) && (
					<form>
						{selectedQueryParamOptions[selectedQueryParam].map(
							(option) => (
								<label key={option}>
									<input
										className={"formOpt"}
										type="radio"
										name="choiceGroup"
										value={option}
										checked={selectedParamValue === option}
										onChange={() =>
											setSelectedParamValue(option)
										}
									/>
									{option}
								</label>
							)
						)}
					</form>
				)}
				<button
					className="mainButton query"
					onClick={() => {
						if (validateGenericQueryCombo()) {
							setErrorTxt("");
							refetchGeneralQuery().then(() => {
								setCoursesToDisplay(generalQueryCourses);
							});
						} else {
							setErrorTxt(
								"Invalid Query Combo: " +
									selectedQueryParam +
									" + " +
									(selectedParamValue
										? selectedParamValue
										: "null")
							);
						}
					}}>
					Query Database
				</button>
				<p className="helperText error">{errorTxt}</p>
				<p className="helperText error">{generalQueryError?.message}</p>
			</div>
			{isGeneralQueryLoading ? (
				<p>Loading...</p>
			) : (
				<CourseDisplay courses={coursesToDisplay} />
			)}
			<Modal isVisible={isCourseEditModalVisible} onClose={() => setIsCourseEditModalVisible(false)}>
				<CourseEdit courses={coursesToDisplay} />
			</Modal>
		</div>
	);
};

export default Dashboard;
