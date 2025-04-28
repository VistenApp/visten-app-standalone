import { get, del, post } from "../service";

export async function get_needed_pokemons(extension: number) {
    return await get("/poke-manager/need?extension=" + extension);
}

export async function delete_needed_pokemon(id: number) {
    return await del("/poke-manager/need/" + id);
}

export async function get_extensions() {
    return await get("/poke-manager/extensions");
}

export async function add_needed_pokemon(extension: number, name: string, rarity: number) {
    const payload = {
        extension: extension,
        name: name,
        rarity: rarity,
    };
    return await post("/poke-manager/need", payload);
}

export async function calculate(extension: number, packPoints: number) {
    return await get("/poke-manager/calculate" + "?extension=" + extension + "&pack_points=" + packPoints);
}