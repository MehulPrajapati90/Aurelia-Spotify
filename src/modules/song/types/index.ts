import { Category } from "@prisma/client";

// server actions

export interface AudioProps {
    audioFile: File
    category: Category;
}

export interface ImageProps {
    imageFile: File
}

export interface DirectSaveProps {
    audioFile: File;
    imageFile?: File;
    title: string;
    category: Category;
}

export interface PropsSaveDatatoDb {
    audioUrl: string,
    imageUrl?: string,
    category: Category,
    title: string,
    duration: number
}

// Cloudinary

export interface UploadResultAudio {
    success: boolean;
    url?: string;
    size?: number;
    error?: string;
    media?: string;
    duration?: number
}

export interface UploadResultImage {
    success: boolean;
    url?: string;
    size?: number;
    error?: string;
    media?: String;
}

export interface UploadDataAudio {
    audioFile: File;
}

export interface UploadDataImage {
    imageFile: File;
}

// Playlist

export interface CreatePlaylistProps {
    userId: string
    title: string
    description?: string
    cover_photo?: string
    songIds?: string[]
}