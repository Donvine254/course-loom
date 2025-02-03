import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^\w-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function validateImageSize(
  url: string
): Promise<{ success: boolean; message?: string; error?: string }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      const { width, height } = img;
      const aspectRatio = width / height;
      if (width >= 1280 && height >= 720 && aspectRatio === 16 / 9) {
        resolve({ success: true, message: "Image is in valid aspect ratio" });
      } else {
        resolve({
          success: false,
          error:
            "Image must be at least 1280x720 pixels with a 16:9 aspect ratio.",
        });
      }

      URL.revokeObjectURL(url); // Cleanup object URL after validation
    };

    img.onerror = () => {
      resolve({ success: false, error: "Invalid image file" });
      URL.revokeObjectURL(url);
    };
  });
}

export const isValidImageFile = (image: File) => {
  const validateImageSize = 5 * 1024 * 1024;
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
  if (!allowedTypes.includes(image.type) || image.size > validateImageSize) {
    return false;
  }
  return true;
};
