import {
  LayoutGrid,
  Code2,
  LineChart,
  Palette,
  Smartphone,
  Camera,
  Briefcase,
  DollarSign,
  FlaskConical,
} from "lucide-react";

export const CategoryFilters = [
  { name: "All", icon: LayoutGrid, color: "text-gray-500" },
  { name: "Web Development", icon: Code2, color: "text-blue-500" },
  { name: "Data Science", icon: FlaskConical, color: "text-green-500" },
  { name: "Marketing", icon: LineChart, color: "text-purple-500" },
  { name: "Design", icon: Palette, color: "text-pink-500" },
  { name: "Business", icon: Briefcase, color: "text-orange-500" },
  { name: "Photography", icon: Camera, color: "text-indigo-500" },
  { name: "Finance", icon: DollarSign, color: "text-yellow-500" },
  { name: "Mobile Development", icon: Smartphone, color: "text-red-500" },
];
