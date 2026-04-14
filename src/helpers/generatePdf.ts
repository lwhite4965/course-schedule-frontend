import type { Course } from "../types/Course";
import { jsPDF } from "jspdf";

// General Helpers
const termOrder: Record<Course["term"], number> = {
	S25: 1,
	F25: 2,
	S26: 3
};

const dayOrder: Record<string, number> = {
	M: 1,
	T: 2,
	W: 3,
	R: 4,
	F: 5
};

function parseTimeToMinutes(time: string): number {
	const [hours, minutes] = time.split(":").map(Number);
	return hours * 60 + minutes;
}

export function downloadCoursesPDF(courses: Course[]) {
	// Sort Sort Sort Sort
	const sorted = [...courses].sort((a, b) => {
		// By Term
		if (termOrder[a.term] !== termOrder[b.term]) {
			return termOrder[a.term] - termOrder[b.term];
		}

		//  By Day
		const aDay = dayOrder[a.meetingDays[0]];
		const bDay = dayOrder[b.meetingDays[0]];
		if (aDay !== bDay) return aDay - bDay;

		// By Starttime
		const aTime = parseTimeToMinutes(a.meetingTimes[0]);
		const bTime = parseTimeToMinutes(b.meetingTimes[0]);

		return aTime - bTime;
	});

	// Initialize PDF
	const doc = new jsPDF();
	// Config PDF
	let y = 15;
	doc.setFontSize(16);
	doc.text("Course Schedule", 10, y);
	y += 10;

	// Iterate Courses in Order
	sorted.forEach((course, index) => {
		// Handle Page Break
		if (y > 270) {
			doc.addPage();
			y = 15;
		}

		const days = course.meetingDays.join("");
		const time = `${course.meetingTimes[0]} - ${course.meetingTimes[1]}`;

		// Write Header
		doc.setFontSize(12);
		doc.text(
			`#${index + 1}) ${course.shortName} (${course.section}) - ${course.term}`,
			10,
			y
		);
		y += 10;

		// Write line information
		doc.setFontSize(10);
		doc.text(`CRN: ${course.crn}`, 10, y);
		y += 8;

		doc.text(`Course: ${course.longName}`, 10, y);
		y += 8;

		doc.text(`Instructor: ${course.instructorName}`, 10, y);
		y += 8;

		doc.text(`Email: ${course.instructorEmail}`, 10, y);
		y += 8;

		doc.text(`Meeting: ${days} ${time}`, 10, y);
		y += 8;

		doc.text(`Room: ${course.meetingRoom}`, 10, y);
		y += 8;

		doc.text(
			`Enrollment: ${course.enrollment} | TAs: ${course.totalTAs}`,
			10,
			y
		);
		y += 8;

		// Only Write Description if it exists
		if (course.courseDescription) {
			doc.text("Description:", 10, y);
			y += 8;

			const split = doc.splitTextToSize(course.courseDescription, 180);
			doc.text(split, 10, y);
			y += split.length * 5;
		}

		// Break between courses
		y += 8;
		doc.line(10, y, 200, y);
		y += 8;
	});

	// Download PDF
	doc.save("myCourses.pdf");
}
