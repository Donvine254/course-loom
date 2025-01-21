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
];
