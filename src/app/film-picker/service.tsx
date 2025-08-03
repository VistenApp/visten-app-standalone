import { get } from "../service";

export async function get_random_film(filters: string) {
  return await get("/film-picker" + filters);
}

export async function get_genres() {
  return await get("/film-picker/genres");
}

export async function get_countries() {
  return await get("/film-picker/countries");
}
