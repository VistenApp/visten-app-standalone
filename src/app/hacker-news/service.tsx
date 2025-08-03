async function api(endpoint: string) {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_HACKER_NEWS_URL + endpoint
    );
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

export function formatTime(time: number) {
  const then = new Date(time * 1000);
  const minutes = Math.floor((Date.now() - then.getTime()) / 60000);
  if (minutes < 60) return minutes + " minutes";

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return hours + " hours";

  const days = Math.floor(hours / 60);
  if (days < 60) return days + " days";
}
