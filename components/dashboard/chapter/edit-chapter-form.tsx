"use client";
import { Chapter, MuxData } from "@prisma/client";
import React from "react";
import RichEditor from "@/components/custom/editor";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, Lock } from "lucide-react";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { FileUpload } from "@/components/ui/file-upload";
import MuxPlayer from "@mux/mux-player-react";
import { updateChapter } from "@/lib/actions/chapters";
import { useRouter } from "next/navigation";
import { CustomOverlay } from "@/components/custom/overlay";
const formSchema = z.object({
  title: z
    .string()
    .min(10, "Title is required and must be greater than 10 characters")
    .max(100, "Title must be within 100 characters"),
  description: z
    .string()
    .min(200, "description is required and must be greater than 100 characters")
    .optional(),
  videoUrl: z.string().optional(),
  isFree: z.boolean(),
});
type ChapterWithMuxData = Chapter & {
  MuxData?: MuxData | null;
};
export default function EditChapterForm({
  initialData,
}: {
  initialData: ChapterWithMuxData;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData.title,
      description: initialData.description || "",
      videoUrl: initialData.videoUrl || "",
      isFree: initialData.isFree,
    },
  });
  const router = useRouter();
  const { isSubmitting } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast.success("Submitted successfully");
    try {
      const res = await updateChapter(values, initialData.id);
      if (res.success) {
        toast.success("Submitted successfully");
        router.refresh();
      } else {
        toast.error(res.error || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error while submitting");
    }
  };
  return (
    <div className="p-4 md:px-6 mx-auto max-w-4xl w-full relative">
      {/* section for loading overlay */}
      {isSubmitting && <CustomOverlay />}
      <div>
        <h1 className="font-bold text-xl md:text-2xl">Chapter Details</h1>
        <p className="text-muted-foreground my-2 text-sm">
          Complete this section with detailed information and a good video to
          give your students the best learning experience.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-5">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Title <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: Introduction to Web Development"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Description <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <RichEditor
                    placeholder="What is this chapter about?"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {initialData.videoUrl && (
            <div className="my-5 ">
              {/* modify to remove hydration errors */}
              <MuxPlayer
                playbackId={
                  initialData.MuxData?.playbackId ||
                  "a4nOgmxGWg6gULfcBbAa00gXyfcwPnAFldF8RdsNyk8M"
                }
                streamType="on-demand"
                className="w-full border dark:border-indigo-100 shadow dark:shadow-indigo-500  "
              />
            </div>
          )}

          <div className="grid grid-cols-1  md:group-has-[[data-collapsible=icon]]/sidebar-wrapper:grid-cols-2 lg:grid-cols-2 gap-2 md:gap-6">
            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    Video <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <FileUpload
                      onChange={(url: string) => field.onChange(url)}
                      endpoint="videoUploader"
                      title={initialData.title}
                      className="border-2 bg-card dark:bg-secondary text-muted-foreground"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* extract this to a separate component */}
            <div className="space-y-2 md:space-y-4 flex flex-col justify-center text-muted-foreground">
              <p className="md:mb-2 xsm:text-sm xsm:text-center">
                Upload your chapter video here. All videos must be at least 720p
                and less than 1GB in size. Students are more likely to enroll if
                your videos are of high quality.{" "}
              </p>
              <small className="xsm:text-center">
                Click here to see{" "}
                <a
                  className="text-indigo-500 underline"
                  href="https://riverside.fm/blog/video-production-tips"
                  referrerPolicy="no-referrer"
                  target="_blank">
                  tips on how to make a good video!
                </a>
              </small>
            </div>
          </div>
          {initialData.videoUrl && (
            <span className="break-all my-2 text-sm">
              Video Url:{" "}
              <a
                href={initialData.videoUrl}
                target="_blank"
                className="hover:underline"
                referrerPolicy="no-referrer">
                {initialData.videoUrl}
              </a>
            </span>
          )}
          <FormField
            control={form.control}
            name="isFree"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 bg-card  mb-2 shadow dark:shadow-indigo-500 relative gap-4">
                <div className="space-y-4">
                  <FormLabel className="flex items-center gap-2">
                    <Lock className="h-4 w-4" /> Accessibility
                  </FormLabel>
                  <FormDescription>
                    Everyone can access this section for FREE
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {form.getValues("isFree") && (
            <small className="text-red-500">
              Warning: This chapter is free and can be viewed by anyone.
            </small>
          )}

          <div className="flex gap-5">
            <Link
              href={`/instructor/courses/${initialData.courseId}/curriculum`}
              passHref>
              <Button
                variant="outline"
                size="sm"
                type="button"
                disabled={isSubmitting}>
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              size="sm"
              title="submit"
              disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
