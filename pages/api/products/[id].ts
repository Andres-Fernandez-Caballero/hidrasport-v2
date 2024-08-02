import urls from "@config/urls";
import { NextApiRequest, NextApiResponse } from "next";
import { SERVER_URL } from "@config/index"; // Asegúrate de que la ruta de importación sea correcta

export default async function getProductDetail(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  if (req.method !== "GET")
    return res.status(405).json({ error: 'Method not allowed' });

  try {
    const productsApiUrl = urls.products;
    console.log(req.query.id);

    const response = await fetch(`${productsApiUrl}${req.query.id}`);
    const data = await response.json();

    console.log('back ' + SERVER_URL);
    

    // Agrega el prefijo SERVER_URL a las URLs de las imágenes
    Object.keys(data.subcodigo_color_dict).forEach(key => {
      const variant = data.subcodigo_color_dict[key];
      variant.images.front = `${SERVER_URL}${variant.images.front}`;
      variant.images.back = `${SERVER_URL}${variant.images.back}`;
    });

    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({
      message: 'Error cargando producto',
      error: (err as Error).message
    });
  }
}
