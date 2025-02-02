export const sampleCourses = [
  {
    title: "Mastering Web Development",
    description:
      "Learn the fundamentals of web development, including HTML, CSS, JavaScript, and modern frameworks like React and Next.js.",
    category: "Web Development",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    chapters: 12,
    price: 49.99,
  },
  {
    title: "Introduction to Data Science",
    description:
      "Discover the basics of data analysis, visualization, and machine learning using Python and popular libraries like Pandas and TensorFlow.",
    category: "Data Science",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    chapters: 10,
    price: 59.99,
  },
  {
    title: "Digital Marketing 101",
    description:
      "Understand the principles of digital marketing, including SEO, social media marketing, email campaigns, and analytics.",
    category: "Marketing",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    chapters: 8,
    price: 39.99,
  },
  {
    title: "Graphic Design for Beginners",
    description:
      "Get started with graphic design using tools like Adobe Photoshop and Illustrator to create stunning visuals.",
    category: "Design",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
    chapters: 9,
    price: 44.99,
  },
  {
    title: "Business Essentials",
    description:
      "Learn the key aspects of running a successful business, including finance, marketing, operations, and strategy.",
    category: "Business",
    image:
      "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F916944433%2F2544591283741%2F1%2Foriginal.20241213-133416?auto=format%2Ccompress&q=75&sharp=10&s=45560ee2227eb15b00851892bb2455bb",
    chapters: 11,
    price: 54.99,
  },
  {
    title: "Photography Masterclass",
    description:
      "Explore the art of photography, from camera basics to advanced techniques, and learn how to capture stunning images.",
    category: "Photography",
    image:
      "https://cdn.fordhamram.com/wp-content/uploads/Complete-the-Photography-Masterclass.jpg",
    chapters: 10,
    price: 49.99,
  },
  {
    title: "Personal Finance Management",
    description:
      "Take control of your finances by learning budgeting, investing, and saving strategies to build wealth.",
    category: "Finance",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    chapters: 7,
    price: 34.99,
  },
  {
    title: "Mobile App Development",
    description:
      "Dive into mobile development with Flutter and React Native to create cross-platform applications.",
    category: "Mobile Development",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    chapters: 15,
    price: 64.99,
  },
];

export const course = {
  title: "Advanced Web Development with React & TypeScript",
  short_description:
    "Learn the fundamentals of web development, including HTML, CSS, JavaScript, and modern frameworks like React and Next.js.",
  long_description:
    "Master modern web development with our comprehensive course on React and TypeScript. This course is designed for developers who want to take their skills to the next level by learning how to build scalable, type-safe applications using industry best practices. You'll learn through practical examples, real-world projects, and hands-on exercises that will help you understand complex concepts and apply them in your own work.",
  instructor: {
    name: "Sarah Johnson",
    role: "Senior Software Engineer",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    bio: "Sarah has over 10 years of experience in web development and has worked with companies like Google and Microsoft. She specializes in React, TypeScript, and modern web architecture.",
    email: "sarah@techsolutions.com",
    courses: [
      "Advanced React Patterns",
      "TypeScript for Professionals",
      "Web Performance Optimization",
    ],
    expertise: [
      "React & React Native",
      "TypeScript",
      "Node.js",
      "Web Performance",
      "System Design",
    ],
  },
  previewVideo: "https://example.com/preview.mp4", //In the model, this will be the first video in the course chapter
  rating: 4.8,
  reviews: 3,
  students: 1205,
  category: "Web Development",
  lastUpdated: "20th Jan 2025",
  price: 89.99,
  coverImage:
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
  duration: "20 hours",
  totalChapters: 12,
  prerequisites: [
    "Basic JavaScript knowledge",
    "Understanding of HTML & CSS",
    "Familiarity with web development concepts",
  ],
  learningObjectives: [
    "Master React hooks and custom hook creation",
    "Build type-safe applications with TypeScript",
    "Implement advanced state management patterns",
    "Create reusable component libraries",
    "Handle complex form validations",
    "Optimize React applications for performance",
  ],
  chapters: [
    {
      title: "Introduction to Modern React Development",
      lessons: 4,
      duration: "2h 15m",
    },
    {
      title: "TypeScript Fundamentals for React",
      lessons: 6,
      duration: "3h 30m",
    },
    {
      title: "Advanced Component Patterns",
      lessons: 5,
      duration: "2h 30m",
    },
    {
      title: "State Management with Redux and Context API",
      lessons: 7,
      duration: "3h 45m",
    },
    {
      title: "React Query and Data Fetching Techniques",
      lessons: 5,
      duration: "2h 20m",
    },
    {
      title: "Building Accessible React Applications",
      lessons: 4,
      duration: "1h 50m",
    },
    {
      title: "Optimizing React Performance",
      lessons: 6,
      duration: "3h 10m",
    },
    {
      title: "Routing with React Router",
      lessons: 5,
      duration: "2h 10m",
    },
    {
      title: "Testing React Components with Jest and React Testing Library",
      lessons: 6,
      duration: "3h",
    },
    {
      title: "Deploying React Applications",
      lessons: 3,
      duration: "1h 30m",
    },
  ],

  studentReviews: [
    {
      name: "Michael Chen",
      rating: 5,
      date: "March 15, 2024",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      comment:
        "One of the best React courses I've taken. Sarah explains complex concepts in a very clear and practical way.",
    },
    {
      name: "Emily Rodriguez",
      rating: 4,
      date: "March 10, 2024",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
      comment:
        "Great course content and structure. The practical examples really helped solidify the concepts.",
    },
    {
      name: "Ana Martinez",
      rating: 5,
      date: "March 5, 2024",
      image:
        "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      comment:
        "Excellent deep dive into TypeScript and React. The section on advanced patterns was particularly helpful.",
    },
    {
      name: "Sofia Patel",
      rating: 5,
      date: "Jan 18, 2025",
      image:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=300&h=300",
      comment:
        "After completing this course I already feel like a senior developer. A lot of best practices on react and typescript.",
    },
    {
      name: "David Kim",
      rating: 5,
      date: "March 5, 2024",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
      comment: "My favorite typescript type is no longer 'any'. Lol.",
    },
    {
      name: "Lisa Thompson",
      rating: 5,
      date: "March 5, 2024",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      comment:
        "Before this course, I did not see typescript as useful as it seemed and thought it was overhyped. This course has been an eye opener.",
    },
  ],
  ratingBreakdown: {
    5: 83,
    4: 17,
    3: 0,
    2: 0,
    1: 0,
  },
};
