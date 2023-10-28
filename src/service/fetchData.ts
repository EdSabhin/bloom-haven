const fetchData = async (url: string): Promise<[]> => {
  const controller = new AbortController();
  const signal = controller.signal;

  try {
    const response = await fetch(url, {
      signal,
    });
    if (!response.ok) {
      throw new Error("Products fetch failed.");
    }
    const data: [] = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(`${error.message}.`);
  } finally {
    controller.abort();
  }
};

export default fetchData;
