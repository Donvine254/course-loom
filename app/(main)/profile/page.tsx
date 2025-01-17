import { UserProfile } from "@clerk/nextjs";
import React from "react";

export default function Profile() {
  return (
    <section className="bg-gradient-to-tr from-indigo-200 via-gray-50 to-blue-200 min-h-screen">
      <div className="py-2 md:pt-8 flex flex-col items-center justify-center h-fit">
        <UserProfile
          routing="hash"
          appearance={{
            variables: {
              colorPrimary: "#4338ca",
            },
          }}
        />
      </div>
    </section>
  );
}
