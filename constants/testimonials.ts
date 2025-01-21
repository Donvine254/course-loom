export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  description: string;
  image: string;
  rating: number;
  date: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Data Science Student",
    company: "Courseloom",
    description:
      "The Machine Learning Fundamentals course exceeded my expectations. The hands-on projects and real-world applications helped me secure a data science internship at a top tech company.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    rating: 5,
    date: "2024-03-01",
  },
  {
    id: 2,
    name: "James Wilson",
    role: "Software Engineering Student",
    company: "Courseloom",
    description:
      "The Web Development Bootcamp was transformative. The curriculum is current with industry standards, and the project-based learning approach gave me a solid portfolio to show employers.",
    image:
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=300&h=300",
    rating: 4,
    date: "2024-02-28",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "UX Design Student",
    company: "Courseloom",
    description:
      "The UX/UI Design Masterclass helped me transition from graphic design to UX. The instructor's feedback was invaluable, and the course projects directly contributed to my portfolio.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    rating: 5,
    date: "2024-02-25",
  },
  {
    id: 4,
    name: "Michael Chang",
    role: "Cloud Computing Student",
    company: "Courseloom",
    description:
      "The AWS Certification Prep course was exactly what I needed. The practice exams and hands-on labs were crucial in helping me pass the certification on my first attempt.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    rating: 5,
    date: "2024-02-20",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Digital Marketing Student",
    company: "Courseloom",
    description:
      "The Digital Marketing Strategy course provided actionable insights that I immediately applied to my business. The ROI tracking module was particularly valuable.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    rating: 4,
    date: "2024-02-15",
  },
  {
    id: 6,
    name: "David Park",
    role: "Mobile Development Student",
    company: "Courseloom",
    description:
      "The iOS App Development course was comprehensive and practical. I published my first app to the App Store before even completing the course!",
    image:
      "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    rating: 5,
    date: "2024-02-10",
  },
  {
    id: 7,
    name: "Anna Martinez",
    role: "Cybersecurity Student",
    company: "Courseloom",
    description:
      "The Ethical Hacking course was intense but incredibly rewarding. The virtual lab environment gave me hands-on experience with real-world security scenarios.",
    image:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    rating: 4,
    date: "2024-02-05",
  },
  {
    id: 8,
    name: "Robert Kim",
    role: "AI Engineering Student",
    company: "Courseloom",
    description:
      "The Deep Learning Specialization opened new career opportunities for me. The course projects were challenging and relevant to current industry problems.",
    image:
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=300&h=300",
    rating: 5,
    date: "2024-01-30",
  },
  {
    id: 9,
    name: "Sophie Anderson",
    role: "Product Management Student",
    company: "Courseloom",
    description:
      "The Product Management Essentials course gave me the confidence to lead product initiatives. The agile methodology section was particularly enlightening.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=300&h=300",
    rating: 5,
    date: "2024-01-25",
  },
  {
    id: 10,
    name: "Thomas Lee",
    role: "DevOps Student",
    company: "Courseloom",
    description:
      "The DevOps Engineering course bridged the gap between development and operations for me. The CI/CD pipeline projects were particularly valuable for my career.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    rating: 4,
    date: "2024-01-20",
  },
  {
    id: 11,
    name: "Sarah Johnson",
    role: "Data Science Student",
    company: "Courseloom",
    description:
      "Courseloom's Data Science track completely transformed my career path. The interactive lessons and real-world projects gave me the confidence to land my dream job. The platform's learning experience is unmatched.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 4,
    date: "2024-01-20",
  },
  {
    id: 12,
    name: "Donvine",
    role: "Finance Student",
    company: "Courseloom",
    description:
      "Courseloom's Finance Course helped me learn how to take control over my finances, invest and save my money so I can plan for my future.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=300&h=300",
    rating: 4,
    date: "2024-01-20",
  },
  {
    id: 13,
    name: "Mary Jane",
    role: "Business Student",
    company: "Courseloom",
    description:
      "As a small business owner, the 'Entrepreneurship 101' course on Courseloom provided me with invaluable insights and practical strategies.",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=300&h=300",
    rating: 4,
    date: "2024-01-20",
  },
  {
    id: 14,
    name: "Rachel Martinez",
    role: "Photography Student",
    company: "Courseloom",
    description:
      "The Digital Photography Masterclass transformed my hobby into a profession. The lighting techniques and composition modules were particularly enlightening. I now run my own photography business.",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=300&h=300",
    rating: 5,
    date: "2024-01-15",
  },
  {
    id: 15,
    name: "Marcus Johnson",
    role: "Film Production Student",
    company: "Courseloom",
    description:
      "The Film Production Essentials course gave me a solid foundation in cinematography and editing. The hands-on projects helped me build a strong portfolio that landed me my first industry job.",
    image:
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=300&h=300",
    rating: 5,
    date: "2024-01-10",
  },
  {
    id: 16,
    name: "Emily Wong",
    role: "Graphic Design Student",
    company: "Courseloom",
    description:
      "The Advanced Adobe Creative Suite course was exactly what I needed to level up my design skills. The instructor's feedback was invaluable, and the course projects now form the cornerstone of my professional portfolio.",
    image:
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=300&h=300",
    rating: 4,
    date: "2024-01-05",
  },
  {
    id: 17,
    name: "Carlos Rivera",
    role: "Digital Marketing Student",
    company: "Courseloom",
    description:
      "The Social Media Marketing Strategy course helped me understand the nuances of different platforms and how to create engaging content. I've since doubled my client's social media engagement.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=300&h=300",
    rating: 5,
    date: "2023-12-30",
  },
  {
    id: 18,
    name: "Alexandra Smith",
    role: "Business Analytics Student",
    company: "Courseloom",
    description:
      "The Business Intelligence and Analytics course equipped me with practical skills in data visualization and interpretation. The real-world case studies were particularly valuable for understanding how to apply these concepts in business scenarios.",
    image:
      "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=300&h=300",
    rating: 4,
    date: "2023-12-25",
  },
  {
    id: 19,
    name: "Daniel Kim",
    role: "Financial Analysis Student",
    company: "Courseloom",
    description:
      "The Financial Modeling and Valuation course was comprehensive and practical. The Excel modeling techniques and valuation methodologies I learned are exactly what I use now in my investment banking role.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=300&h=300",
    rating: 5,
    date: "2023-12-20",
  },
  {
    id: 20,
    name: "Sophia Patel",
    role: "Content Marketing Student",
    company: "Courseloom",
    description:
      "The Content Strategy and SEO course revolutionized how I approach digital content. The practical tips on SEO optimization and content planning have helped me increase organic traffic by 200% for my clients.",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=300&h=300",
    rating: 4,
    date: "2023-12-15",
  },
  {
    id: 21,
    name: "Jordan Taylor",
    role: "Motion Design Student",
    company: "Courseloom",
    description:
      "The Motion Graphics and Animation course was exactly what I needed to transition from static to dynamic design. The After Effects tutorials were particularly helpful in creating engaging social media content.",
    image:
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=300&h=300",
    rating: 5,
    date: "2023-12-10",
  },
  {
    id: 22,
    name: "Nina Rodriguez",
    role: "Brand Strategy Student",
    company: "Courseloom",
    description:
      "The Brand Development and Strategy course provided invaluable insights into building and maintaining strong brand identities. The course projects helped me develop a framework I now use with all my consulting clients.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=300&h=300",
    rating: 5,
    date: "2023-12-05",
  },
  {
    id: 23,
    name: "William Chen",
    role: "Investment Analysis Student",
    company: "Courseloom",
    description:
      "The Investment Analysis and Portfolio Management course gave me a solid foundation in modern portfolio theory and practical investment strategies. The real-time market analysis exercises were particularly beneficial.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=300&h=300",
    rating: 4,
    date: "2023-12-01",
  },
];
