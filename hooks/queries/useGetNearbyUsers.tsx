import { getNearbyUsers } from "@/services/userService";
import { useQuery } from "react-query";

export const useGetNearbyUsers = (isEnabled: boolean, latitude?: number, longitude?: number) => {
    return useQuery<User[], Error>({
        queryKey: ["nearby-users", latitude, longitude],
        queryFn: () => {
            if (latitude === undefined || longitude === undefined) {
                return Promise.resolve([]);
            }
            return getNearbyUsers(latitude, longitude);
        },
        enabled: isEnabled && latitude !== undefined && longitude !== undefined,
    });
};
