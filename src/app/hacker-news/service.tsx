async function api(endpoint: string) {
    try {
        let response = await fetch(process.env.NEXT_PUBLIC_HACKER_NEWS_URL + endpoint)
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

export async function get_top_stories() {
    return await api("/v0/topstories.json");
}

export async function get_item(id: number) {
    return await api(`/v0/item/${id}.json`);
}