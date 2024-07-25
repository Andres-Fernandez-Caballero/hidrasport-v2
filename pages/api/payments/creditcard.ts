import { NextApiRequest, NextApiResponse } from "next";
import {MercadoPagoConfig, Payment} from 'mercadopago'
import { MP_ACCESS_TOKEN } from "@config/index";

export default function creditCardPayment(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method !== 'POST'){
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }
    
    const client = new MercadoPagoConfig({
        accessToken: MP_ACCESS_TOKEN
    })

    const payment = new Payment(client);

    payment.create({body: req.body})
     .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        res.status(400).json({ error: error.message });
      });

}