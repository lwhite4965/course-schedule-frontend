import type { Course } from "../types/Course";
import { faker } from "@faker-js/faker";

// Dummy Data just to set up Frontend
const TERMS: Course["term"][] = ["S25", "F25", "S26"];
const LEVELS: Course["level"][] = ["UG", "GR"];
const MEETING_DAYS: Course["meetingDays"][] = [["M", "W"], ["T", "R"], ["F"]];

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

export default dummyCourses;
