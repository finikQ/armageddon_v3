const apiKey = process.env.API_KEY;

async function getNeoFeed(date?: string) {
  let url = `https://api.nasa.gov/neo/rest/v1/feed?api_key=${apiKey}`;

  if (date) {
    url += `&start_date=${date}&end_date=${date}`;
  }

  try {
    const response = await fetch(url);

    if (response.status === 429) {
      throw new Error("Вы превысили лимит запросов. Попробуйте еще раз позже");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Произошла ошибка при выполнении запроса:", error);
    throw error;
  }
}

export { getNeoFeed };
