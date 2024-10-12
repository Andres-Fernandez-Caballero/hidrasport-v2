import urls from "@config/urls";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getProductDetail(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  if (req.method !== "GET")
    return res.status(405).json({ error: 'Method not allowed' });

  try {
    const productsApiUrl = urls.products;
    const response = await fetch(`${productsApiUrl}${req.query.id}`);
    const data = await response.json();

    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({
      message: 'Error cargando producto',
      error: (err as Error).message
    });
  }
}
