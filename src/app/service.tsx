async function api(endpoint: string, method: string, payload?: object) {
    try {
        const token = localStorage.getItem("token");
        let response;
        if (payload) {
            response = await fetch(
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
        } else {
            response = await fetch(
                process.env.NEXT_PUBLIC_API_URL + endpoint,
                {
                    method: method,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ` + token,
                    },
                }
            )
        }
        if (!response) {
            throw new Error("Internal Server Error");
        }
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error);
        }
        return data;
    } catch (error) {
        console.error(error);
        throw error;
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