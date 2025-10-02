import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { onBoardUser } from "../actions"
import { getCurrentUser } from "../actions/getcurrent-user"


export const useGetCurrentUser = () => {
    return useQuery({
        queryKey: ["user-query"],
        queryFn: async () => getCurrentUser()
    })
}

export const useOnboardUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => onBoardUser(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-query"] })
        }
    })
}