const productFilterFetcher = async (
  url: string,
  page: string = "1",
  category = "all",
  method = "GET",
) => {
  if (isNaN(Number(page))) {
    throw new Error("Invalid page number");
  }

  if (Number(page) < 1) {
    throw new Error("Invalid page number");
  }

  const query = new URLSearchParams();
  query.append("page", page);
  const res = await fetch(`${url}?${query.toString()}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: category
      ? JSON.stringify({
          category: category,
        })
      : undefined,
  });

  if (!res.ok) {
    throw new Error("Error al obtener los productos");
  }

  return await res.json();
};

export default productFilterFetcher;
