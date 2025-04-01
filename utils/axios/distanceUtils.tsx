/**
 * Convert the distance from meters to kms with 1 digit accuracy 
 */
export const formatDistanceInKm = (distanceInMeters: number | undefined) => {
    if (!distanceInMeters && distanceInMeters !== 0) {
        return -1;
    }
    const distanceInKm = distanceInMeters / 1000;
    return distanceInKm.toFixed(1);
}
