"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

type Props = {
  url: string;
  subtitles?: string;
  className?: string;
};

export default function VideoPlayer({ url, subtitles, className }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<typeof videojs.players | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    setTimeout(() => {
      playerRef.current = videojs(videoRef.current!, {
        controls: true,
        autoplay: false,
        preload: "auto",
        responsive: true,
        fluid: true,
      });

      playerRef.current.on("loadeddata", () => {
        console.log("✅ Video loaded");
      });

      playerRef.current.on("ended", () => {
        console.log("📌 Video ended. Update progress.");
        // Handle progress update (e.g., save to DB)
      });
    }, 100);

    return () => {
      if (playerRef.current) {
        console.log("🗑 Disposing video.js player...");
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [url]); // Ensure it runs again if the video URL changes

  return (
    <div data-vjs-player className={cn("relative", className)}>
      <video
        ref={videoRef}
        className="video-js vjs-default-skin"
        controls
        onContextMenu={(e) => e.preventDefault()}
        controlsList="nodownload"
        disablePictureInPicture>
        <source src={url} type="video/mp4" />
        {subtitles && (
          <track
            src={subtitles}
            kind="subtitles"
            srcLang="en"
            label="English"
            default
          />
        )}
      </video>
    </div>
  );
}
