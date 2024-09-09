import urls from "@config/urls";
import { Product } from "@interfaces/IProduct";
import { NextApiRequest, NextApiResponse } from "next";


export default async function getProducts(
  req: NextApiRequest, 
  res: NextApiResponse) 
  {
    if (req.method !== "GET")
      return res.status(405).json({ error: 'Method not allowed' });

    try {
      const page = req.query.page ?? 1;
      const productsApuUrl = urls.products;
      const response = await fetch(`${productsApuUrl}?page=${page}`);
      const data = await response.json();

      // Mapear las imágenes para agregar el prefijo SERVER_URL
      const updatedResults = data.results.map((product: Product) => ({
        ...product,
      }));

      // Enviar la respuesta con las URLs actualizadas
      return res.status(200).json({ ...data, results: updatedResults });
  
    } catch (err) {
      return res.status(407).json({
        message: 'Error cargando productos',
      });
    }
}
