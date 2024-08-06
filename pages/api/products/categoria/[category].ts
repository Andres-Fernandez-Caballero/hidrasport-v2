import { SERVER_URL } from "@config/index";
import urls from "@config/urls";
import { Image, Product } from "@interfaces/IProduct";
import { NextApiRequest, NextApiResponse } from "next";

const getProductByCategory = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const category = req.query.category;
        const page = req.query.page;

        if (!category) {
            return res.status(400).json({ error: "Category is required" });
        }

        const url = `${urls.products}filter/`;
        console.log(url);
        
        const response = await fetch(`${url}?page=${page}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "categories": [category]
            }),
        });

        if ( response.status !== 200 && response.status !==204 ) {
            return res.status(response.status).json({ error: `Error fetching data: ${response.statusText}` });
        }
        
        if (response.status === 204) {
            return res.status(400).json({ error: "categoria invalidar" });
        }


        const data = await response.json();

        data.results = data.results.map((product: Product) => {
            product.images = product.images.map((img: Image) => ({
                ...img,
                image: `${SERVER_URL}${img.image}`
            }));
            return product;
        });

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    }
}

export default getProductByCategory;
