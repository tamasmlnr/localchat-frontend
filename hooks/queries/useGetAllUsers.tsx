import { getAllUsers } from "@/services/userService";
import { useQuery } from "react-query";

export const useGetAllUsers = () => {
    return useQuery<User[], Error>({
        queryKey: ["users"],
        queryFn: getAllUsers,
    });
};
