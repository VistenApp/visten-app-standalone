async function api(endpoint: string, method: string, payload?: object) {
    try {
        const token = localStorage.getItem("token");

        if (payload) {
            return await fetch(
                process.env.NEXT_PUBLIC_API_URL + endpoint,
                {
                    method: method,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ` + token,
                    },
                    body: JSON.stringify(payload),
                }
            )
        }
        return await fetch(
            process.env.NEXT_PUBLIC_API_URL + endpoint,
            {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ` + token,
                },
            }
        )
    } catch (error) {
        console.error(error);
    }
}

export async function post(endpoint: string, payload: object) {
    return await api(endpoint, "POST", payload);
};

export async function get(endpoint: string) {
    return await api(endpoint, "GET");
}

export async function put(endpoint: string, payload: object) {
    return await api(endpoint, "PUT", payload);
}

export async function del(endpoint: string) {
    return await api(endpoint, "DELETE");
}