import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://courseloom.vercel.app";
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
      const aspectRatio = Math.round((width / height) * 100) / 100;
      if (width >= 1280 && height >= 720 && aspectRatio === 1.78) {
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

export const imageUrlConstructor = (public_id: string) => {
  if (public_id.startsWith("courseloom")) {
    return `https://res.cloudinary.com/dipkbpinx/image/upload/${public_id}.webp`;
  } else return public_id;
};

export function formatMuxDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${hours}hr ${minutes}min ${remainingSeconds}s`;
}

export const getVideoDuration = async (videoUrl: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    const videoElement = document.createElement("video");
    videoElement.preload = "metadata";
    videoElement.onloadedmetadata = () => {
      const duration = videoElement.duration;
      resolve(duration);
      window.URL.revokeObjectURL(videoElement.src);
    };
    videoElement.onerror = () => {
      reject(new Error("Failed to load video metadata"));
    };
    videoElement.src = videoUrl;
  });
};

export function ReloadWindow() {
  if (typeof window !== "undefined" && window) {
    window.location.reload();
  }
}
