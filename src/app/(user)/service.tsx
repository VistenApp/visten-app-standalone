import { post, get } from "../service";

export async function login(username: string, password: string) {
  const payload = {
    username: username,
    password: password,
  };
  const response = await post("/users/login", payload);

  if (response.token) {
    localStorage.setItem("token", response.token);
  } else {
    throw new Error("Internal Server Error");
  }
}

export async function signup(username: string, password: string) {
  const payload = {
    username: username,
    password: password,
  };
  const response = await post("/users/signup", payload);

  if (response.token) {
    localStorage.setItem("token", response.token);
  } else {
    throw new Error("Internal Server Error");
  }
}

export async function get_profile() {
  return await get("/users/profile");
}

export async function change_password(
  current_password: string,
  new_password: string
) {
  const payload = {
    current_password: current_password,
    new_password: new_password,
  };
  return await post("/users/change-password", payload);
}
