import { updateCourse } from "./actions/courses";
import { baseUrl } from "./utils";

export async function uploadToCloudinary(image: File) {
  const newImage = new FormData();
  newImage.append("file", image);
  newImage.append("cloud_name", "dipkbpinx");
  newImage.append("upload_preset", "ekomtspw");
  newImage.append("folder", "courseloom");
  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dipkbpinx/image/upload",
      {
        method: "POST",
        body: newImage,
      }
    );
    const data = await response.json();
    return {
      success: true,
      message: "Image saved successfully",
      image: data.public_id,
    };
  } catch (error) {
    console.error("Error uploading image:", error);
    return { success: false, message: "Something went wrong" };
  }
}

export async function deleteCloudinaryImage(
  publicId: string,
  courseId: string
) {
  try {
    await fetch(`${baseUrl}/api/cloudinary`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ public_id: publicId }),
    });
    await updateCourse(courseId, { imageUrl: "" });

    console.log(`Deleted Cloudinary image: ${publicId}`);
  } catch (error) {
    console.error(`Failed to delete Cloudinary image: ${publicId}`, error);
  }
}
