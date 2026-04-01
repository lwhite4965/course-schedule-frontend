import "./Dashboard.css";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";

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
	if (!role) {
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

	// RETURN THE MORE TRADITIONAL DASHBOARD, WITH UNIQUE TABS BASED ON ROLE
	return (
		<>
			<p>Good Afternoon - {role}</p>
			<p>Lame Dashboard Pal -_-</p>
		</>
	);
};

export default Dashboard;
