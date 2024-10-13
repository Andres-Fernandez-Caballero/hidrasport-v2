import type {NextApiRequest, NextApiResponse} from 'next';

interface Data {
    message?: string;
}

export default async function forgotPassword (
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method !== 'POST')
        return res.status(405).json({message: 'Method not allowed'});

    const {email} = req.body;
    if (!email)
        return res.status(400).json({message: 'Faltan datos'});

    // llamada a la api de hidra 
    // const response = await fetch('/algo)
    // if(response.ok )
    //  const errorText = await response.text();
    //   throw new Error(`Error ${response.status}: ${errorText}`);    
    //const data = await response.json(); // agregar mensaje de data a la respuesta
    return res.status(200).json({message: "Se envio un email con el link de recuperación de contraseña a" + email});
}