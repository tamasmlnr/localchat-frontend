import { updateUser } from "@/services/userService";
import { useMutation } from "react-query";

export const useUpdateUserMutation = () => {
    return useMutation({
        mutationFn: updateUser,
    });
};
