// eslint-disable-next-line
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const categories = [
  "Programming",
  "Web Development",
  "Mobile Development",
  "Design",
  "Business",
  "Finance",
  "Teaching & Academics",
  "Marketing",
  "Personal Development",
  "Music",
  "Photography",
  "Health & Fitness",
  "Lifestyle",
  "Filming",
  "Data Science",
  "Machine Learning",
  "Writing",
];
// category expects name: string
const categoryData = categories.map((name) => ({ name }));
async function seedDb() {
  try {
    console.log("🌱Seeding database...");
    await prisma.category.createMany({
      data: categoryData,
    });
    console.log(`✅ database seeded successfully!`);
  } catch (error) {
    console.error("❌ Error: " + error);
  }
}

seedDb().then((res) => console.log(res));
// async function cleanDb() {
//   console.log("🧹 Cleaning database...");
//   await prisma.course.deleteMany();
//   console.log("✅ Cleared data from the database...");
// }
// cleanDb().then((res) => console.log(res));
