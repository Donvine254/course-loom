"use server";

import { baseUrl } from "../utils";
import { updateChapterVideo } from "./chapters";

export async function deleteFile(url: string, chapterId: string) {
  try {
    const response = await fetch(`${baseUrl}/api/uploadthing`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      console.log("Failed to delete assets");
      return {
        success: false,
        error: `Failed to delete file: ${response.statusText}`,
      };
    }
    await updateChapterVideo({ videoUrl: "", duration: 0 }, chapterId);
    console.log("Asset deleted successfully");
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Error deleting file:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
