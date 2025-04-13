import { get, del } from "../service";

export async function get_needed_pokemons(extension: number) {
    const response = await get("/poke-manager/need?extension=" + extension);
    if (!response) {
        throw new Error("Internal Server Error");
    }
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error);
    }
    return data;
}

export async function delete_needed_pokemon(id: number) {
    const response = await del("/poke-manager/need/" + id);
    if (!response) {
        throw new Error("Internal Server Error");
    }
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error);
    }
    return data;
}

export async function get_extensions() {
    const response = await get("/poke-manager/extensions");
    if (!response) {
        throw new Error("Internal Server Error");
    }
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error);
    }
    return data;
}
