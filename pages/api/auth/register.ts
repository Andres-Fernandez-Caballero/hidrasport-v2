import type { NextApiRequest, NextApiResponse } from "next";
import { RegisterDto } from "@interfaces/IAuth";
import urls from "@config/urls";

interface Data {
  message?: string;
  // Agrega otros campos que esperas en la respuesta
}

export default async function RegisterPost(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const registerData: RegisterDto = req.body;

  try {
    const response = await fetch(`${urls.register}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    });
      const data = await response.json();
      if(!response.ok){
        throw new Error(`Error ${Object.values(data)}`);
      }
      
      return res.status(200).json(data);
    }catch (err) {
    return res.status(400).json({ message: (err as Error).message });
  }
}
