import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createPlaylist, GetAudioData, GetPlaylist, GetSpecificSongData, saveSongtoCloudinaryAndDb, saveSongtoDb } from "../actions";
import { CreatePlaylistProps, DirectSaveProps, PropsSaveDatatoDb } from "../types";

// song

export const useGetSongsData = () => {
    return useQuery({
        queryKey: ['song'],
        queryFn: async () => GetAudioData()
    })
}

export const useGetSpecificSongData = (id: string) => {
    return useQuery({
        queryKey: ['song', id],
        queryFn: async () => GetSpecificSongData(id),
    })
}

export const useSaveSongToDb = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: PropsSaveDatatoDb) => saveSongtoDb(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['song'] })
        }
    })
}

export const useDirectSaveSongtoCloudinaryAndDb = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: DirectSaveProps) => saveSongtoCloudinaryAndDb(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['song'] })
        }
    })
}

// playlist

export const useGetPlaylist = () => {
    return useQuery({
        queryKey: ['playlist'],
        queryFn: async () => GetPlaylist(),
    })
}

export const useCreatePlaylist = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: CreatePlaylistProps) => createPlaylist(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['playlist'] })
        }
    })
}