import { post, get } from "../service";

export async function login(username: string, password: string) {
    const payload = {
        username: username,
        password: password,
    };
    const response = await post("/users/login", payload);
    if (!response) {
        throw new Error("Internal Server Error");
    }
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error);
    }
    if (data.token) {
        localStorage.setItem("token", data.token);
    } else {
        throw new Error("Internal Server Error");
    }
}

export async function get_profile() {
    const response = await get("/users/profile");
    if (!response) {
        throw new Error("Internal Server Error");
    }
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error);
    }

    return data;
}

export async function change_password(
    current_password: string,
    new_password: string,
) {
    const payload = {
        current_password: current_password,
        new_password: new_password,
    };
    const response = await post("/users/change-password", payload);
    if (!response) {
        throw new Error("Internal Server Error");
    }
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error);
    }
}
