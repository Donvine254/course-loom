"use client";
import React from "react";
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export interface Course {
  id: string;
  title: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  price: number;
  isPublished: boolean;
}

interface CourseTableProps {
  courses: Course[];
}

export function CourseTable({ courses }: CourseTableProps) {
  const getStatusColor = (status: Course["status"]) => {
    switch (status) {
      case "PUBLISHED":
        return "bg-green-500 text-white";
      case "DRAFT":
        return "bg-yellow-500 text-white";
      case "ARCHIVED":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-900  rounded-lg mt-2 border border-input shadow">
      <Table className="table-auto">
        <TableHeader className="bg-indigo-600 text-white">
          <TableRow>
            <TableHead className="text-white">Title</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className="text-white">Price</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell className="font-medium">{course.title}</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={getStatusColor(course.status)}>
                  {course.status.toLocaleLowerCase()}
                </Badge>
              </TableCell>
              <TableCell>
                {" "}
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "KSH",
                  maximumFractionDigits: 2,
                }).format(course.price * 120)}
              </TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-40 space-y-2" align="end">
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2"
                      asChild>
                      <Link href={`/courses/draft/${course.id}`}>
                        <Eye className=" h-4 w-4" />
                        Preview
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2"
                      asChild>
                      <Link href={`/instructor/courses/${course.id}`}>
                        <Edit className="h-4 w-4" />
                        Edit
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-100">
                      <Trash2 className=" h-4 w-4" />
                      Delete
                    </Button>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
