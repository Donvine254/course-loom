"use client";
import { getRole } from "@/lib/helpers/roles";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
  Tooltip,
} from "../ui/tooltip";
import { Roles } from "@/types";
import { usePathname } from "next/navigation";

export default function RoleSwitchButton() {
  const [role, setRole] = useState<Roles>(undefined);
  const pathname = usePathname();
  useEffect(() => {
    const fetchRole = async () => {
      const userRole = await getRole();
      setRole(userRole);
    };

    fetchRole();
  }, []);
  if (!role || role !== "instructor") {
    return null;
  }
  const isInstructorView = pathname.startsWith("/instructor");

  const buttonText = isInstructorView ? "Student" : "Instructor";
  const targetPath = isInstructorView ? "/learn" : "/instructor";

  const message = isInstructorView
    ? "Switch to the student view here - get back to the courses you're taking."
    : "Switch to instructor view here - see your courses and create new ones.";

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none h-10 px-4 py-2">
          <Link href={targetPath}>{buttonText}</Link>
        </TooltipTrigger>
        <TooltipContent
          className="max-w-52"
          side="bottom"
          data-state="delayed-open">
          <p>{message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
