import { Course, Instructor, User } from "@prisma/client";

// file to declare types
export type sessionUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  hasImage: boolean;
  imageUrl?: string;
};

export type Roles = "admin" | "instructor" | undefined;

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
type PartialCategory = {
  id: string;
  name: string;
};
// type for partial course

export type PartialCourse = Required<Course> & {
  category: PartialCategory;
  _count: {
    chapters: number;
  };
};
type InstructorWithCourses = Pick<
  Instructor,
  "id" | "username" | "image" | "bio" | "email" | "specialization" | "expertise"
> & {
  courses: { id: string; title: string; slug: string; isPublished: boolean }[];
};
export type FullCourse = Required<Course> & {
  category: PartialCategory;
  instructor: InstructorWithCourses;
  _count: {
    purchases: number;
  };
  chapters: {
    id: string;
    title: string;
    position: number;
    duration: number | null;
    subtitles: string | null;
    isFree: boolean;
    videoUrl: string | null;
    _count: {
      attachments: number;
    };
  }[];
  reviews: {
    id: string;
    rating: number;
    comment: string;
    createdAt: Date;
    user: Pick<User, "id" | "firstName" | "lastName" | "profileImage">;
  }[];
};
