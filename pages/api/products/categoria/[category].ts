import urls from "@config/urls";
import { NextApiRequest, NextApiResponse } from "next";

const getProductByCategory = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const category = req.query.category;
        const page = req.query.page;

        if (!category) {
            return res.status(400).json({ error: "Category is required" });
        }

        const url = `${urls.products}filter/`;
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
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    }
}

export default getProductByCategory;
