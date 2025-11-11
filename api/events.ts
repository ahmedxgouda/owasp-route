import { apiUrl } from "@/api/root";
import { calcCoordinates } from "@/utils/calc_cordinates";

const THRESHOLD_DISTANCE_KM = 50;

export function getEvents(latitude: number, longitude: number) {
    const { minLat, maxLat, minLng, maxLng } = calcCoordinates(latitude, longitude, THRESHOLD_DISTANCE_KM);

    return fetch(`${apiUrl}/events?latitude_lte=${maxLat}&latitude_gte=${minLat}&longitude_lte=${maxLng}&longitude_gte=${minLng}&upcoming=True`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());
}
