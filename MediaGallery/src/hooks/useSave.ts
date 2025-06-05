import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { PhotoBase, SaveData } from "../types/PhotoBase";
import { deleteSaveRequest, savedRequest, saveRequest } from "../api/SaveRequest";
import { useAuthContext } from "../context/AuthContext";

export const useSave = (photo?: PhotoBase) => {
    const queryClient = useQueryClient();
    const { user } = useAuthContext();

    const { data: savedItems, isLoading } = useQuery<PhotoBase[]>({
        queryKey: ["saved"],
        queryFn: savedRequest,
    });

    const isSaved = photo ? savedItems?.some(item => item.id === photo.id) ?? false : false;

    const {
        mutate: addSave,
        isPending: isSaving,
        isError: isSaveError,
        error: saveError,
    } = useMutation({
        mutationFn: () => {
            if (!photo) throw new Error("No photo to save");
            if (!user) throw new Error("No user logged in");

            const mappedPhoto: SaveData = {
                userId: user.user_id,
                imageId: photo.id,
                imageUrl: photo.urls.full,  // url correcta del objeto Unsplash
                title: photo.description || null,
            };


            return saveRequest(mappedPhoto);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["saved"] });
        },
    });

    const {
        mutate: removeSave,
        isPending: isUnsaving,
        isError: isUnsavingError,
        error: unsavingError,
    } = useMutation({
        mutationFn: () => {
            if (!photo) throw new Error("No photo to unsave");
            return deleteSaveRequest(photo.id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["saved"] });
        },
    });

    const toggleSave = () => {
        if (isSaved) removeSave();
        else addSave();
    };

    return {
        isSaved,
        isLoading,
        toggleSave,
        isPending: isSaving || isUnsaving,
        saveError,
        unsavingError,
        isSaveError,
        isUnsavingError,
    };
};
