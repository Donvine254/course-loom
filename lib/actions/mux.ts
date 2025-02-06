"use server";
import prisma from "@/prisma/prisma";
import Mux from "@mux/mux-node";

const { video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID as string,
  tokenSecret: process.env.MUX_TOKEN_SECRET as string,
});

type Data = {
  videoUrl: string;
  chapterId: string;
};
export async function CreateOrUpdateMuxData(data: Data) {
  try {
    const existingMuxData = await prisma.muxData.findFirst({
      where: {
        chapterId: data.chapterId,
      },
    });

    if (existingMuxData) {
      // delete and create a new asset
      await video.assets.delete(existingMuxData.assetId);
      await prisma.muxData.delete({
        where: {
          id: existingMuxData.id,
        },
      });
    } else {
      // create the asset if it doesn't exist
      const asset = await video.assets.create({
        input: [{ url: data.videoUrl }],
        playback_policy: ["public"],
        test: false,
      });
      await prisma.muxData.create({
        data: {
          assetId: asset.id,
          chapterId: data.chapterId,
          playbackId: asset.playback_ids?.[0]?.id,
        },
      });
    }
    // eslint-disable-next-line
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "An error occurred.",
    };
  }
}
