import { get } from "../service";

export async function get_pokemons() {
    console.log("Fetching pokemons");
    const response = await get("/poke-manager");
    if (!response) {
        throw new Error("Internal Server Error");
    }
    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.error);
    }
    console.log("Pokemons fetched successfully");
    return data;
}