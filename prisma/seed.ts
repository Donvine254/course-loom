// eslint-disable-next-line
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// const categories = [
//   "Programming",
//   "Web Development",
//   "Mobile Development",
//   "Design",
//   "Business",
//   "Finance",
//   "Teaching & Academics",
//   "Marketing",
//   "Personal Development",
//   "Music",
//   "Photography",
//   "Health & Fitness",
//   "Lifestyle",
//   "Filming",
//   "Data Science",
//   "Machine Learning",
//   "Writing",
// ];
// category expects name: string
// const categoryData = categories.map((name) => ({ name }));
const courses = [
  {
    title: "Mastering Web Development",
    slug: "mastering-web-development",
    description:
      "Learn the fundamentals of web development, including HTML, CSS, JavaScript, and modern frameworks like React and Next.js.",
    categoryId: "900ab444-8cf6-4406-af2c-e6f57d20f534",
    imageUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    price: 49.99,
    instructorId: "user_2sHa32GAi05yBLbKOsCdWslIqX9",
  },
  {
    title: "Introduction to Data Science",
    slug: "introduction-to-data-science",
    description:
      "Discover the basics of data analysis, visualization, and machine learning using Python and popular libraries like Pandas and TensorFlow.",
    categoryId: "a0f66b70-0584-43f5-bad4-17ccd63990db",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    price: 59.99,
    instructorId: "user_2sHa32GAi05yBLbKOsCdWslIqX9",
  },
  {
    title: "Digital Marketing 101",
    slug: "digital-marketing-101",
    description:
      "Understand the principles of digital marketing, including SEO, social media marketing, email campaigns, and analytics.",
    categoryId: "1fdf1006-3b78-4dd9-b650-f5aa97ec7c5c",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    price: 39.99,
    instructorId: "user_2sHa32GAi05yBLbKOsCdWslIqX9",
  },
  {
    title: "Graphic Design for Beginners",
    slug: "graphic-design-for-beginners",
    description:
      "Get started with graphic design using tools like Adobe Photoshop and Illustrator to create stunning visuals.",
    categoryId: "aa0092a4-74e9-469f-bae6-8b54f9e9d13d",
    imageUrl:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
    price: 44.99,
    instructorId: "user_2sHa32GAi05yBLbKOsCdWslIqX9",
  },
  {
    title: "Business Essentials",
    slug: "business-essentials",
    description:
      "Learn the key aspects of running a successful business, including finance, marketing, operations, and strategy.",
    categoryId: "147b49b4-66e8-42e7-8ecf-e326e500395d",
    imageUrl:
      "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F916944433%2F2544591283741%2F1%2Foriginal.20241213-133416?auto=format%2Ccompress&q=75&sharp=10&s=45560ee2227eb15b00851892bb2455bb",
    price: 54.99,
    instructorId: "user_2sHa32GAi05yBLbKOsCdWslIqX9",
  },
  {
    title: "Photography Masterclass",
    slug: "photography-masterclass",
    description:
      "Explore the art of photography, from camera basics to advanced techniques, and learn how to capture stunning images.",
    categoryId: "6d9e1322-7f40-4c51-98e6-26d7b9e15736",
    imageUrl:
      "https://cdn.fordhamram.com/wp-content/uploads/Complete-the-Photography-Masterclass.jpg",
    price: 49.99,
    instructorId: "user_2sHa32GAi05yBLbKOsCdWslIqX9",
  },
  {
    title: "Personal Finance Management",
    slug: "personal-finance-management",
    description:
      "Take control of your finances by learning budgeting, investing, and saving strategies to build wealth.",
    categoryId: "73fcc4c8-8897-4d2c-8a1e-2c11b58e4140",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    price: 34.99,
    instructorId: "user_2sHa32GAi05yBLbKOsCdWslIqX9",
  },
  {
    title: "Mobile App Development",
    slug: "mobile-app-development",
    description:
      "Dive into mobile development with Flutter and React Native to create cross-platform applications.",
    categoryId: "029ad2db-b79e-4f7d-855c-08d00316ce9a",
    imageUrl:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    price: 64.99,
    instructorId: "user_2sHa32GAi05yBLbKOsCdWslIqX9",
  },
];
async function seedDb() {
  try {
    console.log("🌱Seeding database...");
    await prisma.course.createMany({
      data: courses,
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
