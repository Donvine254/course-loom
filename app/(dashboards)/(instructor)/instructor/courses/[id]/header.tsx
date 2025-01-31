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
        <AlertDescription className="xsm:text-xs">
          This course is unpublished. It will not be visible to students
        </AlertDescription>
      </Alert>
      {/* buttons section */}
      <div className="flex gap-2 overflow-x-auto p-4 md:px-6 mx-auto max-w-4xl w-full justify-between">
        <div className="flex gap-5 ">
          <Link href={`/instructor/courses/${id}`}>
            <Button
              size="sm"
              variant={
                pathname === `/instructor/courses/${id}` ? "default" : "outline"
              }>
              Basic Information
            </Button>
          </Link>
          <Link href={`/instructor/courses/${id}/sections`}>
            <Button
              size="sm"
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
          {/* TODO: Add publish and delete buttons */}
          <Button disabled variant="ghost" size="sm">
            Publish
          </Button>
          <Button
            size="icon"
            title="delete course"
            type="button"
            className="bg-red-100 text-destructive hover:bg-destructive hover:text-destructive-foreground">
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
