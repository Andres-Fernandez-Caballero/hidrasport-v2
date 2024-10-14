import urls from "@config/urls";
import { NextApiRequest, NextApiResponse } from "next";

const getBestOfProducts = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const page = req.query.page ?? 1;

        const url = `${urls.products}filter/`;
        const response = await fetch(`${url}?page=${page}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "bestof": true
            }),
        });

        if ( response.status !== 200) {
            return res.status(response.status).json({ error: `Error fetching data: ${response.statusText}` });
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    }
}

export default getBestOfProducts;
