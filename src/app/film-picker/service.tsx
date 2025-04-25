import { get } from "../service";

export async function get_random_film() {
    const response = await get("/film-picker");
    if (!response) {
        throw new Error("Internal Server Error");
    }
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error);
    }
    return data;
}