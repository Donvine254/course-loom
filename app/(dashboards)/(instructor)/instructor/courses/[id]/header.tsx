"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { InfoIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export const Header = ({ id }: { id: string }) => {
  const pathname = usePathname();
  return (
    <div>
      {" "}
      <Alert variant="warning">
        <InfoIcon className="h-4 w-4" />
        <AlertDescription>
          This course is unpublished. It will not be visible to students
        </AlertDescription>
      </Alert>
      {/* buttons section */}
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between  p-2 sm:p-4 md:px-6">
        <div className="flex gap-5">
          <Link href={`/instructor/courses/${id}`}>
            <Button
              variant={
                pathname === `/instructor/courses/${id}` ? "default" : "outline"
              }>
              Basic Information
            </Button>
          </Link>
          <Link href={`/instructor/courses/${id}/sections`}>
            <Button
              variant={
                pathname === `/instructor/courses/${id}/sections`
                  ? "default"
                  : "outline"
              }>
              Curriculum
            </Button>
          </Link>
        </div>
        <div className="flex gap-5 items-start">
          <Button disabled variant="ghost">
            Publish
          </Button>
          <Button size="icon" className="text-destructive">
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
