import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function Page() {
  return (
    <div className="h-screen flex flex-col justify-center items-center py-3 bg-gradient-to-tr from-indigo-200 via-gray-100 to-indigo-200 dark:bg-gradient-to-tr dark:from-indigo-950 dark:via-gray-950 dark:to-indigo-950">
      <SignUp
        routing="hash"
        appearance={{
          elements: {
            formButtonPrimary: {
              fontSize: 14,
              textTransform: "none",
              border: "none",
              backgroundColor: "#4f46e5",
              "&:hover, &:focus, &:active": {
                backgroundColor: "#4338ca ",
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
          href="/login"
          prefetch={null}
          className="text-blue-500 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
