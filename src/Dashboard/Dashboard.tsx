import "./Dashboard.css";
import { useUser, SignOutButton } from "@clerk/clerk-react";
import { useState } from "react";
import type { Course } from "../types/Course";
import { CourseDisplay } from "../CourseDisplay/CourseDisplay";
export const Dashboard = () => {
	// Pull User Data from Clerk
	const { user, isLoaded } = useUser();

	// Define type for user role
	type UserRole = "Student" | "Professor" | "Course Scheduler";

	// Pull role from metadata - no need for state as this never changes once set
	const role = user?.unsafeMetadata.role as UserRole;

	// THIS SECTION OF CODE IS ONLY USED FOR ASSIGNING A ROLE ON FIRST SIGN IN!!!!

	// State for selectedRole
	const [selectedRole, setSelectedRole] = useState<UserRole>("Student");

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
					<label>
						<input
							className={"formOpt"}
							type="radio"
							name="choiceGroup"
							value="Student"
							checked={selectedRole === "Student"}
							onChange={() => setSelectedRole("Student")}
						/>
						Student
					</label>

					<label>
						<input
							className={"formOpt"}
							type="radio"
							name="choiceGroup"
							value="Professor"
							checked={selectedRole === "Professor"}
							onChange={() => setSelectedRole("Professor")}
						/>
						Professor
					</label>
					<label>
						<input
							className={"formOpt"}
							type="radio"
							name="choiceGroup"
							value="Course Scheduler"
							checked={selectedRole === "Course Scheduler"}
							onChange={() => setSelectedRole("Course Scheduler")}
						/>
						Course Scheduler
					</label>
				</form>
				<p className="helperText">Selected: {selectedRole}</p>
				<button className="authBtn" onClick={() => assignRole()}>
					Save Role
				</button>
			</div>
		);
	}

	// Dummy Data just to set up Frontend
	const dummyCourses: Course[] = [
		{
			term: "S25",
			level: "UG",
			section: "001",
			crn: "00001",
			shortName: "COP 4200",
			longName: "Data Structures",
			enrollment: 34,
			totalTAs: 3,
			meetingRoom: "SOC 142",
			meetingDays: ["M", "W"],
			meetingTimes: ["9:00AM", "12:00PM"],
			instructorName: "Henry H. Jeanty",
			instructorEmail: "hjeanty@usf.edu",
			courseDescription: "N/A"
		},
		{
			term: "S26",
			level: "GR",
			section: "001",
			crn: "00004",
			shortName: "COP 6000",
			longName: "Program Design But Harder",
			enrollment: 6,
			totalTAs: 1,
			meetingRoom: "BSN 4200",
			meetingDays: ["F"],
			meetingTimes: ["9:00 AM", "12:00 PM"],
			instructorName: "Hye S. Yi",
			instructorEmail: "hsyiy@usf.edu",
			courseDescription: "N/A"
		}
	];

	// Get user's email
	const userEmail = user?.emailAddresses[0].emailAddress;

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
				{role == "Course Scheduler" && (
					<button className="mainButton">
						Update Course Descriptions
					</button>
				)}
				{role == "Professor" && (
					<button className="mainButton">
						Download Course Schedule
					</button>
				)}
			</div>

			<CourseDisplay courses={dummyCourses} />
		</div>
	);
};

export default Dashboard;
