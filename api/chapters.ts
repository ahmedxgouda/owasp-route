import { apiUrl } from "@/api/root";
import { calcCoordinates } from "@/utils/calc_cordinates";

const THRESHOLD_DISTANCE_KM = 300;

export function getChapters(latitude: number, longitude: number) {
    const { minLat, maxLat, minLng, maxLng } = calcCoordinates(latitude, longitude, THRESHOLD_DISTANCE_KM);
    console.log({ minLat, maxLat, minLng, maxLng });
    return fetch(`${apiUrl}/chapters?latitude_lte=${maxLat}&latitude_gte=${minLat}&longitude_lte=${maxLng}&longitude_gte=${minLng}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());
}
