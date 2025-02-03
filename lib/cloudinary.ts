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
      image: data.secure_url,
    };
  } catch (error) {
    console.error("Error uploading image:", error);
    return { success: false, message: "Something went wrong" };
  }
}
