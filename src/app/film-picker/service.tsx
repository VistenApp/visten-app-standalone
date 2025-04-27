import { get } from "../service";

export async function get_random_film(filters: string) {
    const response = await get("/film-picker" + filters);
    if (!response) {
        throw new Error("Internal Server Error");
    }
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error);
    }
    return data;
}

export async function get_genres() {
    const response = await get("/film-picker/genres");
    if (!response) {
        throw new Error("Internal Server Error");
    }
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error);
    }
    return data;
}