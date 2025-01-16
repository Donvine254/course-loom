import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function Page() {
  return (
    <div className="h-screen flex flex-col justify-center items-center py-2  bg-gradient-to-tr from-blue-200 via-gray-50 to-blue-200">
      <SignIn
        routing="hash"
        appearance={{
          elements: {
            formButtonPrimary: {
              fontSize: 14,
              textTransform: "none",
              border: "none",
              backgroundColor: "#103FEF",
              "&:hover, &:focus, &:active": {
                backgroundColor: "#2563eb",
              },
            },
            footer: {
              display: "none",
            },
          },
        }}
      />
      <p className="text-sm my-2">
        Already have an account?{" "}
        <Link
          href="/register"
          prefetch={null}
          className="text-blue-500 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
