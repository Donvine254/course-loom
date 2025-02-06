import { OurFileRouter } from "@/app/api/uploadthing/core";
import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";
import { baseUrl } from "./utils";

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

export async function deleteFile(url: string) {
  try {
    const response = await fetch(`${baseUrl}/api/uploadthing`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      return {
        success: false,
        error: `Failed to delete file: ${response.statusText}`,
      };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Error deleting file:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
