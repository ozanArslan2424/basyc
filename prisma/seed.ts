import { PrismaClient } from "prisma/generated";

const prisma = new PrismaClient();

async function main() {
	const hash = await Bun.password.hash("123456789");
	const user = await prisma.user.create({
		data: {
			name: "Test Account",
			email: "testaccount@test.com",
			password: hash,
			image: "https://avatar.iran.liara.run/public",
		},
	});

	await prisma.person.create({
		data: {
			userId: user.id,
			name: user.name,
			email: user.email,
			image: user.image,
		},
	});

	const usersData = [
		{ name: "John Doe", email: "john.doe@example.com" },
		{ name: "Jane Smith", email: "jane.smith@example.com" },
		{ name: "Mike Johnson", email: "mike.johnson@example.com" },
		{ name: "Sarah Wilson", email: "sarah.wilson@example.com" },
		{ name: "David Brown", email: "david.brown@example.com" },
		{ name: "Emily Davis", email: "emily.davis@example.com" },
		{ name: "Chris Lee", email: "chris.lee@example.com" },
		{ name: "Amanda Taylor", email: "amanda.taylor@example.com" },
		{ name: "Robert Miller", email: "robert.miller@example.com" },
		{ name: "Lisa Anderson", email: "lisa.anderson@example.com" },
	];

	for (const [index, userData] of usersData.entries()) {
		const hash = await Bun.password.hash("123456789");

		const user = await prisma.user.create({
			data: {
				name: userData.name,
				email: userData.email,
				password: hash,
				image: `https://avatar.iran.liara.run/public/${index}`,
			},
		});

		await prisma.person.create({
			data: {
				userId: user.id,
				name: user.name,
				email: user.email,
				image: user.image,
			},
		});

		console.log(`Created user: ${userData.name}`);
	}
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
