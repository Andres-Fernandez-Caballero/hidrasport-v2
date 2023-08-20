// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ResponseApi, ResponseCartApi } from "../interfaz";
import { apiCall } from "tools/apiCall";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseCartApi | ResponseApi>
) {
  switch (req.method) {
    case "POST":
      try {
        const {subProductId, size} = req.body;
        if(!subProductId || !size) 
            return res.status(400).json({ status: 400,  message: "Bad Request" })
        const response = (await apiCall({
            url: `https://hidrasport.com.ar/api/sessions/cart/modify/${subProductId}/${size}/add/1/`,
        })) as unknown as ResponseCartApi;
        res.status(200).json(response);
      } catch (error) {
        res
          .status(500)
          .json({ status: 500,  message: "Internal Server Error" });
      }
      break;
    default:
      res.status(400).json({ status: 400,  message: "Bad Request" });
      break;
  }
}
