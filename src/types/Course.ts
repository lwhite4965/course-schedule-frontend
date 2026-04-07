export interface Course {
	term: "S25" | "F25" | "S26";
	level: "UG" | "GR";
	section: string; // 001 or 007
	crn: string; // Always 5 digits
	shortName: string; // Subject + Course Number e.g. CIS 4930 or COP 4200
	longName: string; // Formal Course Name e.g. Computer Vision or Software Engineering
	enrollment: number; // # of students in class
	totalTAs: number; // # of combined UG and GR TA's
	meetingRoom: string;
	meetingDays: string[]; // Array of 1 letter day indicators: M, T, W, R, F
	meetingTimes: string[]; // 2 elements in array - start time and end time
	instructorName: string;
	instructorEmail: string;
	courseDescription?: string;
}
