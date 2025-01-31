"use client";
import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { HelpCircle, LockIcon, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateCourse } from "@/lib/actions/courses";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
interface PricingFormProps {
  initialData: Course;
  courseId: string;
}
const formSchema = z.object({
  price: z
    .union([z.string(), z.null(), z.number()])
    .transform((value) => {
      if (value === null || value === "") return 0;
      return typeof value === "string" ? parseFloat(value) : value;
    })
    .refine((value) => !isNaN(value) && value >= 0 && value <= 1000, {
      message: `Price must be between 0 and $1,000`,
    })
    .nullable(),
  isFree: z.boolean(),
});
export default function PricingForm({
  initialData,
  courseId,
}: PricingFormProps) {
  const [isEditing, setIsEditing] = useState(!initialData.price);
  const router = useRouter();
  const toggleEdit = () => {
    if (isEditing) {
      form.setValue("price", initialData.price || 0);
      form.setValue("isFree", initialData.isFree || false);
    }
    setIsEditing((current) => !current);
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
    mode: "onChange",
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await updateCourse(courseId, values);
      if (res.success) {
        toast.success("Course description updated successfully");
        toggleEdit();
        router.refresh();
      } else {
        toast.error(res.error || "Something went wrong");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const { isSubmitting, isValid } = form.formState;

  return (
    <div className="border bg-card rounded-md p-4 mb-2 shadow dark:shadow-indigo-500">
      <div className="font-medium flex items-center justify-between">
        <label
          htmlFor="title"
          className="font-semibold flex items-center gap-2 text-muted-foreground">
          Price
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent
                className="max-w-72 text-sm"
                side="bottom"
                data-state="delayed-open">
                <p>
                  Select a price for this course. The default price is 29.99 for
                  all courses. Values are in US dollars but will be converted to
                  local currencies.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </label>
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Price
            </>
          )}
        </Button>
      </div>
      <small className="text-muted-foreground">
        Select a price for this course. The default price is 29.99 for all
        courses. Values are in US dollars but will be converted to local
        currencies.
      </small>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isSubmitting || !isEditing}
                    placeholder="29.99"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isFree"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow bg-gray-50 dark:bg-input">
                <div className="space-y-0.5">
                  <label className="font-semibold flex items-center gap-2 ">
                    <LockIcon className="h-4 w-4" />
                    Access Settings
                  </label>
                  <FormDescription className="text-sm text-muted-foreground">
                    Toggle this if you want to offer your course for free
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
          {isEditing && (
            <div className="flex items-center gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
                size="sm">
                Save
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
