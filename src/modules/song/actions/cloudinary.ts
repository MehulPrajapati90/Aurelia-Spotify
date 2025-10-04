"use server";

import { v2 as cloudinary } from "cloudinary";
import { UploadDataAudio, UploadDataImage, UploadResultAudio, UploadResultImage } from "../types";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME || "",
    api_key: process.env.CLOUDINARY_API_KEY || "",
    api_secret: process.env.CLOUDINARY_API_SECRET || "",
    timeout: 60000,
});

export const UploadSongtoCloudinary = async ({ audioFile }: UploadDataAudio): Promise<UploadResultAudio> => {
    try {
        if (!audioFile) {
            return { success: false, error: "No file provided" };
        }

        if (!audioFile.type.startsWith("audio/")) {
            return { success: false, error: "Only audio files are allowed" };
        }

        const arrayBuffer = await audioFile.arrayBuffer();
        const base64Str = `data:${audioFile.type};base64,${Buffer.from(arrayBuffer).toString("base64")}`;

        const uploadResult = await cloudinary.uploader.upload(base64Str, {
            resource_type: "video",
            folder: "songs",
        });

        return {
            success: true,
            url: uploadResult.secure_url,
            size: audioFile.size,
            duration: uploadResult.duration,
            media: "AUDIO"
        };
    } catch (error: any) {
        console.error("Cloudinary audio upload error:", error);
        return { success: false, error: error.message || "Failed to upload" };
    }
};

export const UploadImagestoCloudinary = async ({ imageFile }: UploadDataImage): Promise<UploadResultImage> => {
    try {
        if (!imageFile) {
            return { success: false, error: "No file provided" };
        }

        if (!imageFile.type.startsWith("image/")) {
            return { success: false, error: "Only image files are allowed" };
        }

        const arrayBuffer = await imageFile.arrayBuffer();
        const base64Str = `data:${imageFile.type};base64,${Buffer.from(arrayBuffer).toString("base64")}`;

        const uploadResult = await cloudinary.uploader.upload(base64Str, {
            resource_type: "image",
            folder: "uploads",
            transformation: [
                { width: 1200, crop: "limit" },
                { fetch_format: "auto", quality: "auto" },
            ],
        });

        const optimizedUrl = cloudinary.url(uploadResult.public_id, {
            fetch_format: "auto",
            quality: "auto",
        });

        return {
            success: true,
            url: optimizedUrl,
            size: imageFile.size,
            media: "IMAGE"
        };
    } catch (error: any) {
        console.error("Cloudinary upload error:", error);
        return { success: false, error: error.message || "Failed to upload" };
    }
};
