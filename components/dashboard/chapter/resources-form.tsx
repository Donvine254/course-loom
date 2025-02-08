"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { CustomOverlay } from "@/components/custom/overlay";
import { Loader2, File } from "lucide-react";
import { FileUploader } from "@/components/custom/file-upload";
import {
  createChapterAttachment,
  deleteChapterAttachment,
} from "@/lib/actions/chapters";
import { ReloadWindow } from "@/lib/utils";
import { Chapter } from "@prisma/client";
import DeleteButton from "@/components/custom/delete-dialog";
import { useRouter } from "next/navigation";
// declare a schema
export const uploadSchema = z.object({
  name: z.string().min(1, "Filename is required"),
  resourceType: z.enum(["url", "file"]),
  url: z.string().url("Url is required"),
});

export default function FilesUploaderForm({
  initialData,
}: {
  initialData: Chapter & {
    attachments: { name: string; url: string; id: string }[] | null;
  };
}) {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const router = useRouter();
  const form = useForm<z.infer<typeof uploadSchema>>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      name: "",
      resourceType: "url",
      url: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof uploadSchema>) => {
    try {
      const { name, url } = values;
      const res = await createChapterAttachment(initialData.id, { name, url });
      if (res.success) {
        toast.success("Attached added successfully");
        form.reset();
        ReloadWindow();
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while creating a new attachment");
    }
  };
  const resourceType = form.watch("resourceType");
  const { isSubmitting } = form.formState;
  //   function to handle type changes
  const handleTypeChange = (checked: boolean) => {
    if (uploadedFile && !checked) {
      toast.error("Cannot switch to URL mode after uploading a file");
      return;
    }
    form.setValue("resourceType", checked ? "url" : "file");
  };

  //   function to handle deleting attachments
  async function handleDeleteAttachment(id: string) {
    try {
      const res = await deleteChapterAttachment(id);
      if (res.success) {
        toast.success(res.message);
        router.refresh();
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }
  return (
    <div className="p-4 md:px-6 mx-auto max-w-4xl w-full ">
      <div>
        <h2 className="font-bold text-lg md:text-xl flex items-center gap-2">
          <File className="h-4 w-4" /> Chapter Resources (Optional)
        </h2>
        <p className="text-muted-foreground my-2 text-sm">
          Upload resources or add links to articles and blogs to help students
          learn better.
        </p>
      </div>

      {initialData.attachments && (
        <div className="my-2">
          {initialData.attachments.map((attachment) => (
            <div
              key={attachment.id}
              className="flex items-center gap-2 w-full my-2 ">
              <div className="flex flex-1 items-center gap-2 p-2 border rounded-lg bg-indigo-100 text-sm">
                <File className="h-3 w-3 flex-shrink-0 text-indigo-500" />
                <a
                  href={attachment.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-500 hover:underline truncate">
                  {attachment.name}
                </a>
              </div>
              <div className="flex-shrink-0">
                <DeleteButton
                  id={attachment.id}
                  onDelete={handleDeleteAttachment}
                  item="attachment file"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 mt-5 relative">
          {isSubmitting && <CustomOverlay />}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  File Name<span className="text-red-500">*</span>
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
          {/* change the file type  */}
          <div className="flex items-center justify-between py-2">
            <FormLabel htmlFor="upload-mode">Upload Mode</FormLabel>
            <div className="flex items-center space-x-2">
              <FormLabel
                htmlFor="upload-mode"
                className="text-sm text-gray-500">
                {resourceType === "url" ? "URL" : "File"}
              </FormLabel>
              <Switch
                id="upload-mode"
                checked={resourceType === "url"}
                onCheckedChange={handleTypeChange}
              />
            </div>
          </div>
          {/* space for file uploader */}
          {resourceType === "url" ? (
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    URL<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://example.com/file.pdf"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <FormField
              control={form.control}
              name="url"
              render={() => (
                <FormItem>
                  <FileUploader
                    endpoint="fileUploader"
                    className="border-2 bg-card dark:bg-secondary text-muted-foreground  rounded-lg "
                    title={form.getValues("name")}
                    onChange={async (url: string) => {
                      if (!form.getValues("name")) {
                        toast.error("Please enter a file name first!");
                        return;
                      }

                      // Save uploaded file info in form
                      form.setValue("url", url);
                      setUploadedFile(url);
                      form.setValue("resourceType", "file");
                      // Auto-submit the form
                      form.handleSubmit(onSubmit)();
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {/* If we upload, we autosubmit the form */}
          <Button
            type="submit"
            size="sm"
            title="submit"
            className="xsm:w-full "
            disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                {" "}
                <Loader2 className="h-4 w-4 animate-spin" /> Saving...
              </>
            ) : (
              "Save Resource"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
