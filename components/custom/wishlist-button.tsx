"use client";
import { Heart, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { useEffect, useState, useTransition } from "react";
import {
  deleteWhitelist,
  isWishListed,
  whitelistCourse,
} from "@/lib/actions/wishlist";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function WhiteListButton({ courseId }: { courseId: string }) {
  const [isWishlisted, setIsWishlisted] = useState<boolean>(true);
  const [loading, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const result = await isWishListed(courseId);
      setIsWishlisted(result);
    });
  }, [courseId]);

  function toggleWhitelist() {
    setIsWishlisted((prev) => !prev);
    startTransition(async () => {
      if (isWishlisted) {
        const res = await deleteWhitelist(courseId);
        if (res.success) {
          toast.success(res.message);
        } else {
          toast.error(res.error);
        }
      } else {
        const res = await whitelistCourse(courseId);
        if (res.success) {
          toast.success(res.message);
        } else {
          toast.error(res.error);
        }
      }
    });
  }
  return (
    <>
      <SignedOut>
        <SignInButton>
          <Button
            variant="outline"
            className="flex-1 border bg-gray-100 dark:bg-indigo-950 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-700 transition-colors"
            title="Sign in to add course to whitelist"
            type="button"
            disabled={loading}>
            <Heart className="w-8 h-8 mx-auto" />
          </Button>
        </SignInButton>
      </SignedOut>
      {/* return this when the user is logged in */}
      <SignedIn>
        <Button
          variant="outline"
          className={cn(
            "flex-1 border rounded-lg  transition-colors bg-gray-100 dark:bg-indigo-950 hover:bg-indigo-200 dark:hover:bg-indigo-700 "
          )}
          title={
            isWishlisted
              ? "Remove course from whitelist"
              : "Add course to whitelist"
          }
          type="button"
          disabled={loading}
          onClick={toggleWhitelist}>
          {!loading ? (
            <Heart
              className={cn(
                "w-8 h-8 mx-auto",
                isWishlisted && "text-indigo-600 fill-indigo-600"
              )}
            />
          ) : (
            <Loader2 className="w-8 h-8 mx-auto animate-spin" />
          )}
        </Button>
      </SignedIn>
    </>
  );
}
