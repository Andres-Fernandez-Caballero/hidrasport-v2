import { SERVER_URL } from "@config/index";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest, 
  res: NextApiResponse) 
  {
    if (req.method === "GET") {
      get(req, res);
  }
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  const page = req.query.page ?? 1;
  const productsApuUrl = `${SERVER_URL}/api/store/products/?page=${page}`;
  const response = await fetch(productsApuUrl);
  const data = await response.json();
  return res.json(data);
}
