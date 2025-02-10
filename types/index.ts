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

// type for partial course
type Course = {
  imageUrl: string;
  price: number;
  description: string;
  title: string;
  slug: string;
  summary: string;
  createdAt: Date;
  updatedAt: Date;
};
export type PartialCourse = Course & {
  category: {
    id: string;
    name: string;
  };
  _count: {
    chapters: number;
  };
};
