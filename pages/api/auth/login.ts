// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Data } from "../interfaz";
import { HIDRA_SERVER_URL } from "@config/index";
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    fetch(`${HIDRA_SERVER_URL}/api/accounts/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            delete data.response;
            res.status(200).json(data);
          });
        } else {
          throw new Error("Error al iniciar sesión " + response.statusText);
        }
      })
      .catch((error) => {
        res.status(500).json({ message: (error as Error).message });
      });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
