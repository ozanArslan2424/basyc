import { ApplicantSourceEnum, ApplicantStatusEnum, type TApplicant } from "./applicant/applicant.type";
import { EmploymentStatusEnum, EmploymentTypeEnum, type TEmployee } from "./employee/employee.type";

const firstNames = ["Ahmet", "Mehmet", "Ayşe", "Fatma", "Mustafa", "Zeynep", "Emre", "Elif", "Can", "Deniz"];
const lastNames = ["Yılmaz", "Kaya", "Demir", "Çelik", "Şahin", "Arslan", "Koç", "Öztürk", "Korkmaz"];

const positions = [
	"Frontend Developer",
	"Backend Developer",
	"UX Designer",
	"Product Manager",
	"DevOps Engineer",
	"Data Scientist",
	"HR Specialist",
];
const departments = ["Yazılım", "Tasarım", "İnsan Kaynakları", "Operasyon", "Pazarlama", "Finans"];

const applicantSources = Object.values(ApplicantSourceEnum);
const applicantStatuses = Object.values(ApplicantStatusEnum);

export function generateMockApplicants(count: number): TApplicant[] {
	return Array.from({ length: count }, (_, index) => {
		const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
		const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
		const fullName = `${firstName} ${lastName}`;

		return {
			id: (index + 1).toString(),
			createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
			updatedAt: new Date().toISOString(),
			firstName,
			lastName,
			fullName,
			email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@mail.com`,
			phone: `+90${500 + Math.floor(Math.random() * 500)}${100 + Math.floor(Math.random() * 900)}${1000 + Math.floor(Math.random() * 9000)}`,
			position: positions[Math.floor(Math.random() * positions.length)],
			status: applicantStatuses[Math.floor(Math.random() * applicantStatuses.length)],
			source: applicantSources[Math.floor(Math.random() * applicantSources.length)],
			notes: Math.random() > 0.7 ? "Öncelikli aday" : undefined,
			interviewDate:
				Math.random() > 0.5 ? new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString() : undefined,
		};
	});
}

const employmentStatuses = Object.values(EmploymentStatusEnum);
const employmentTypes = Object.values(EmploymentTypeEnum);

export function generateMockEmployees(count: number): TEmployee[] {
	return Array.from({ length: count }, (_, index) => {
		const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
		const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
		const fullName = `${firstName} ${lastName}`;

		return {
			id: (index + 1).toString(),
			createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
			updatedAt: new Date().toISOString(),
			firstName,
			lastName,
			fullName,
			email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
			department: departments[Math.floor(Math.random() * departments.length)],
			position: positions[Math.floor(Math.random() * positions.length)],
			status: employmentStatuses[Math.floor(Math.random() * employmentStatuses.length)],
			employmentType: employmentTypes[Math.floor(Math.random() * employmentTypes.length)],
			startDate: new Date(Date.now() - Math.random() * 400 * 24 * 60 * 60 * 1000).toISOString(),
			salary: Math.floor(Math.random() * 30000) + 15000,
			managerId: Math.random() > 0.8 ? (Math.floor(Math.random() * count) + 1).toString() : undefined,
			address: "İstanbul, Türkiye",
			notes: Math.random() > 0.6 ? "Performans değerlendirmesi yaklaşıyor" : undefined,
		};
	});
}
