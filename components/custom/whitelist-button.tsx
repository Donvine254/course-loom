import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { useEffect, useState, useTransition } from "react";
import { isWhiteListed } from "@/lib/actions/whitelist";
import { cn } from "@/lib/utils";

export default function WhiteListButton({ courseId }: { courseId: string }) {
  const [isWhitelisted, setIsWhitelisted] = useState<boolean>(false);
  const [loading, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const result = await isWhiteListed(courseId);
      setIsWhitelisted(result);
    });
  }, [courseId]);

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
            <Heart
              className={cn(
                "w-5 h-5 mx-auto",
                isWhitelisted ? "fill-red-500 text-red-500" : "text-gray-500"
              )}
            />
          </Button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <Button
          variant="outline"
          className="flex-1 border bg-gray-100 dark:bg-indigo-950 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-700 transition-colors"
          title="Add course to whitelist"
          type="button">
          <Heart className="w-5 h-5 mx-auto" />
        </Button>
      </SignedIn>
    </>
  );
}
