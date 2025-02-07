"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { CustomOverlay } from "./overlay";

type Props = {
  url: string;
  subtitles?: string;
  className?: string;
};

export default function VideoPlayer({ url, subtitles, className }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<typeof videojs.players | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!videoRef.current) return;

    playerRef.current = videojs(videoRef.current, {
      controls: true,
      autoplay: false,
      preload: "auto",
      responsive: true,
      fluid: true,
    });

    // Listen for "loadeddata" event to know when video is ready
    playerRef.current.on("loadeddata", () => {
      console.log("Video loaded.");
      setIsLoading(false);
    });

    playerRef.current.on("ended", () => {
      console.log("Video ended. Update progress here.");
      // Handle progress update (e.g., save to DB)
    });

    return () => {
      if (playerRef.current) {
        console.log("Disposing video.js player...");
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div data-vjs-player className={cn("relative", className)}>
      {isLoading && <CustomOverlay />}
      <video ref={videoRef} className="video-js vjs-default-skin" controls>
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
