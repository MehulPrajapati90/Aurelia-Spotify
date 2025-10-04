"use server";

import { currentUser } from "@clerk/nextjs/server";
import { UploadImagestoCloudinary, UploadSongtoCloudinary } from "./cloudinary";
import { client } from "@/lib/db";
import { AudioProps, CreatePlaylistProps, DirectSaveProps, ImageProps, PropsSaveDatatoDb } from "../types";


export const saveSongtoCloudinaryAndDb = async (data: DirectSaveProps) => {
    try {
        const { audioFile, imageFile, title, category } = data;
        const user = await currentUser();
        if (!user) return { success: false, error: "User not found" };

        const uploadAudio = await UploadSongtoCloudinary({ audioFile });
        if (!uploadAudio.success) return { success: false, error: "Failed to upload audio" };

        let coverPhotoUrl: string;
        if (imageFile) {
            const uploadImage = await UploadImagestoCloudinary({ imageFile });
            if (!uploadImage.success) return { success: false, error: "Failed to upload image" };
            coverPhotoUrl = uploadImage.url!;
        } else {
            coverPhotoUrl = await fetch(`https://avatar.iran.liara.run/username?username=${title}`).then(res => res.url);
        }

        const dbUser = await client.user.findFirst({ where: { clerkId: user.id } });
        if (!dbUser) return { success: false, error: "User record not found" };

        const durationSec = uploadAudio.duration ? Math.round(uploadAudio.duration) : 0;

        const createdSong = await client.song.create({
            data: {
                artistId: dbUser.id,
                song: uploadAudio.url!,
                cover_photo: coverPhotoUrl,
                songDurationSec: durationSec,
                category,
                title,
            },
        });

        if (!createdSong) {
            return { success: false, error: "Failed to save metadata" };
        }

        return {
            success: true, message: "Uploaded successfully!", song: createdSong
        };
    } catch (e: any) {
        console.error("Upload error:", e);
        return { success: false, error: e.message || "Failed to upload" };
    }
};

export const savetoCloudinaryAudio = async (data: AudioProps) => {
    try {
        const { audioFile, category } = data;
        const user = await currentUser();

        if (!user) {
            return { success: false, error: "User not found" };
        }

        const uploadMediaAudio = await UploadSongtoCloudinary({ audioFile });

        if (!uploadMediaAudio.success) {
            return { success: false, error: "Failed to upload file" };
        }

        return {
            success: true,
            message: "Audio Uploaded Successfully",
            url: uploadMediaAudio.url,
            duration: uploadMediaAudio.duration,
            category: category
        }

    } catch (e) {
        console.error("Upload error:", e);
        return { success: false, error: "Failed to upload" };
    }
}

export const savetoCloudinaryImage = async (data: ImageProps) => {
    try {
        const { imageFile } = data;
        const user = await currentUser();

        if (!user) {
            return { success: false, error: "User not found" };
        }

        const uploadMediaImage = await UploadImagestoCloudinary({ imageFile });

        if (!uploadMediaImage.success) {
            return { success: false, error: "Failed to upload file" };
        }

        return {
            success: true,
            message: "Image Uploaded Successfully",
            url: uploadMediaImage?.url,
            size: uploadMediaImage?.size
        }

    } catch (e) {
        console.error("Upload error:", e);
        return { success: false, error: "Failed to upload" };
    }
}

export const saveSongtoDb = async (data: PropsSaveDatatoDb) => {
    try {
        const { category, audioUrl, imageUrl, title, duration } = data;
        const user = await currentUser();

        if (!user) {
            return { success: false, error: "User not found" };
        }

        const fetchUser = await client.user.findFirst({
            where: { clerkId: user.id },
        });

        if (!fetchUser) {
            return { success: false, error: "User record not found" };
        }

        const roundDuration = Math.round(duration);

        const cover = imageUrl || (await fetch(`https://avatar.iran.liara.run/username?username=${title}`).then(res => res.url));

        const uploadMediaMetaData = await client.song.create({
            data: {
                artistId: fetchUser.id,
                song: audioUrl!,
                cover_photo: cover!,
                songDurationSec: roundDuration!,
                category: category,
                title: title,
            },
        });

        if (!uploadMediaMetaData) {
            return { success: false, error: "Failed to save metadata" };
        }

        return { success: true, message: "Uploaded successfully!" };

    } catch (e) {
        console.error("Upload error:", e);
        return { success: false, error: "Failed to upload" };
    }
}

export const GetAudioData = async () => {
    try {
        // const user = await currentUser();

        // if (!user) {
        //     return { success: false, error: "User not found" };
        // }

        const song = await client.song.findMany({
            include: {
                user: true,
                playlists: true,
            },
        });

        if (!song) {
            return {
                success: true,
                message: "No Songs Found"
            }
        }

        return {
            success: true,
            message: "Fetched all Songs",
            song: song
        }
    } catch (e) {
        console.error("Fetching error:", e);
        return { success: false, error: "Failed to fetch" };
    }
}

export const GetSpecificSongData = async (id: string) => {
    try {
        const user = await currentUser();

        if (!user) {
            return { success: false, error: "User not found" };
        }

        const song = await client.song.findUnique({
            where: {
                id: id
            },
            include: {
                user: true,
                playlists: true,
            },
        });

        if (!song) {
            return {
                success: true,
                message: "Songs Not Found"
            }
        }

        return {
            success: true,
            message: "Fetched Songs Successfully",
            song: song
        }
    } catch (e) {
        console.error("Fetching error:", e);
        return { success: false, error: "Failed to fetch" };
    }
}

export const createPlaylist = async (data: CreatePlaylistProps) => {
    try {
        const { userId, title, description, cover_photo, songIds } = data;

        const user = await currentUser();

        if (!user) {
            return { success: false, error: "User not found" };
        }

        const cover = cover_photo || (await fetch(`https://avatar.iran.liara.run/username?username=${title}`).then(res => res.url));

        const playlist = await client.playlist.create({
            data: {
                userId: userId,
                title: title,
                description: description || '',
                cover_photo: cover,
                songs: {
                    connect: songIds?.map((id) => ({ id })) || [],
                },
            },
            include: {
                songs: true,
            },
        });

        if (!playlist) {
            return {
                success: true,
                message: "Error Creating Playlist!"
            }
        }

        return {
            success: true,
            playlist: playlist,
        };
    } catch (e) {
        console.error("Creating error:", e);
        return { success: false, error: "Failed to create" };
    }
}

export const GetPlaylist = async () => {
    try {
        const user = await currentUser();

        if (!user) {
            return { success: false, error: "User not found" };
        }

        const dbuser = await client.user.findUnique({
            where: {
                clerkId: user.id
            }
        })

        if (!dbuser) {
            return { success: false, error: "User recored not found" };
        }

        const playlist = await client.playlist.findMany({
            where: {
                userId: dbuser?.id
            },
            include: {
                user: true,
                songs: true
            },
            orderBy: {
                createdAt: "desc",
            },
        })

        return {
            success: true,
            message: "Fetched Playlist Successfully!",
            playlists: playlist
        }
    } catch (e) {
        console.error("Creating error:", e);
        return { success: false, error: "Failed to fetch" };
    }
}