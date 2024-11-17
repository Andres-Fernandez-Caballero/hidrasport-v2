import urls from '@config/urls';
import type { NextApiRequest, NextApiResponse } from 'next';

interface Data {
    message?: string;
}

export default async function forgotPassword(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method !== 'POST')
        return res.status(405).json({ message: 'Method not allowed' });

    const { email } = req.body;
    console.log(email);
    
    if (!email)
        return res.status(400).json({ message: 'Faltan datos' });

    const response = await fetch(urls.forgotPassword, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email})
    })


    if (!response.ok){
        return res.status(400).json({message: `Email no registrado.`});
    }

    const data = await response.json(); // agregar mensaje de data a la respuesta
    return res.status(200).json({ message: data.message });
}