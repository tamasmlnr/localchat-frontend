import { getNearbyUsers } from "@/services/userService";
import { useQuery } from "react-query";

export const useGetNearbyUsers = (isEnabled: boolean, longitude?: number, latitude?: number) => {
    console.log("loc", longitude, ",", latitude);
    return useQuery<User[], Error>({
        queryKey: ["nearby-users", longitude, latitude],
        queryFn: () => {
            if (longitude === undefined || latitude === undefined) {
                return Promise.resolve([]);
            }
            return getNearbyUsers(longitude, latitude);
        },
        enabled: (isEnabled && longitude !== undefined && latitude !== undefined),
    });
};
