import "./Dashboard.css";
import { useUser, SignOutButton } from "@clerk/clerk-react";
import { useState } from "react";
import type { Course } from "../types/Course";
import { CourseDisplay } from "../CourseDisplay/CourseDisplay";
import { faker } from "@faker-js/faker";
export const Dashboard = () => {
	// Pull User Data from Clerk
	const { user, isLoaded } = useUser();

	// Define type for user role
	type UserRole = "Student" | "Professor" | "Course Scheduler";

	// Define type for QueryParam
	type QueryParam = "Instructor" | "Building" | "Meeting Days" | "Faculty Ratio";

	// Pull role from metadata - no need for state as this never changes once set
	const role = user?.unsafeMetadata.role as UserRole;

	// THIS SECTION OF CODE IS ONLY USED FOR ASSIGNING A ROLE ON FIRST SIGN IN!!!!

	// State for selectedRole
	const [selectedRole, setSelectedRole] = useState<UserRole>("Student");

	// State for selectedQueryParam - YOU CAN ONLY QUERY WITH ONE PARAM PER BACKEND CALL
	const [selectedQueryParam, setSelectedQueryParam] = useState<QueryParam>("Instructor");

	// State for selectedParamValue - TRACKS VALUE REGUARDLESS OF SELECTED QUERYPARAM
	const [selectedParamValue, setSelectedParamValue] = useState<string>("");

	// Function for setting a user's role in Clerk metadata
	const assignRole = async () => {
		if (!isLoaded || !user) return;

		user.update({
			unsafeMetadata: {
				role: selectedRole
			}
		});
	};

	// RETURN DIOLOGUE FOR ROLE SELECTION IF THERE IS NONE IN USER METADATA - THIS SHOULD ONLY HAPPEN ONCE PER USER
	if (!role || !isLoaded) {
		return (
			<div className="vertParent">
				<p className={"helperText"}>Which Role?</p>
				<form>
					{["Student", "Professor", "Course Scheduler"].map((roleOption) => (
						<label key={roleOption}>
							<input
							className={"formOpt"}
							type="radio"
							name="choiceGroup"
							value={roleOption}
							checked={selectedRole === roleOption}
							onChange={() => setSelectedRole(roleOption as UserRole)}
						/>
						{roleOption}
					</label>
				))}
				</form>
				<p className="helperText">Selected: {selectedRole}</p>
				<button className="authBtn" onClick={() => assignRole()}>
					Save Role
				</button>
			</div>
		);
	}

	// Dummy Data just to set up Frontend
	const TERMS: Course["term"][] = ["S25", "F25", "S26"];
	const LEVELS: Course["level"][] = ["UG", "GR"];
	const MEETING_DAYS: Course["meetingDays"][] = [["M", "W"], ["T", "R"], ["F"]];
	const dummyCourses: Course[] = [];

	for (let i = 0; i < 30; i++) {
		dummyCourses.push({
			term: faker.helpers.arrayElement(TERMS),
			level: faker.helpers.arrayElement(LEVELS),
			section: faker.string.numeric(3),
			crn: faker.string.numeric(5),
			shortName: `${faker.string.alpha({ length: 3, casing: 'upper' })} ${faker.string.numeric(4)}`,
			longName: faker.helpers.arrayElement(["Data Structures", "Software Engineering", "Operating Systems", "Database Design"]),
			enrollment: faker.number.int({ min: 10, max: 100 }),
			totalTAs: faker.number.int({ min: 0, max: 5 }),
			meetingRoom: `${faker.string.alpha({ length: 3, casing: 'upper' })} ${faker.string.numeric(3)}`,
			meetingDays: faker.helpers.arrayElement(MEETING_DAYS),
			meetingTimes: [`${faker.number.int({ min: 8, max: 15 })}:00`, `${faker.number.int({ min: 16, max: 22 })}:00`],
			instructorName: faker.person.fullName(),
			instructorEmail: faker.internet.email(),
			courseDescription: faker.lorem.sentence()
		});
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
					{userEmail} - {role}
				</p>
				{["Course Scheduler", "Professor"].includes(role) && (
					<button className="mainButton">
						{role == "Course Scheduler" ? "Update Course Descriptions" : "Some Other Action"}
					</button>
				)}
			</div>
			<div className="horizontalLayer leftAlign">
				<p className={"introText"}>Query By?</p>
				<form>
					{["Instructor", "Building", "Meeting Days", "Faculty Ratio"].map((param) => (
						<label key={param}>
							<input
								className={"formOpt"}
								type="radio"
								name="choiceGroup"
								value={param}
								checked={selectedQueryParam === param}
								onChange={() => setSelectedQueryParam(param as QueryParam)}
							/>
							{param}
						</label>
					))}
				</form>
			</div>
			<div className="horizontalLayer leftAlign">
				<p className="introText">Search for which {selectedQueryParam}:</p>
				{["Instructor", "Building"].includes(selectedQueryParam) && (
					<input
						type="text"
						value={selectedParamValue}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setSelectedParamValue(e.target.value);
						}}
					/>
				)}
				{["Meeting Days", "Faculty Ratio"].includes(selectedQueryParam) && (
					<form>
						{selectedQueryParamOptions[selectedQueryParam].map((option) => (
							<label key={option}>
								<input className={"formOpt"}
									type="radio"
									name="choiceGroup"
									value={option}
									checked={selectedParamValue === option}
									onChange={() => setSelectedParamValue(option)}
								/>
								{option}
							</label>
						))}
					</form>
				)}
				<button className="mainButton query">Query Database</button>
			</div>
			<CourseDisplay courses={dummyCourses} />
		</div>
	);
};

export default Dashboard;
