// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { LoginDto } from "@interfaces/IAuth";
import urls from "@config/urls";

interface Data {
  message?: string;
  // Agrega otros campos que esperas en la respuesta
}

export default async function LoginPost(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const loginData: LoginDto = req.body;
  try {
    const response = await fetch(`${urls.login}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    });

    const data = await response.json();
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    return res.status(201).json(data);
  } catch (err) {
    return res.status(401).json({ message: (err as Error).message });
  }
}
