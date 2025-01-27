// file to declare types
export type sessionUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  hasImage: boolean;
  imageUrl?: string;
};

export type Roles = "admin" | "instructor";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
