import type {NextApiRequest, NextApiResponse} from 'next';

interface Data {
    message?: string;
}

export default async function changePassword (
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method !== 'GET')
        return res.status(405).json({message: 'Method not allowed'});

    const {password, passwordConfirmation} = req.query;
    if (!password || !passwordConfirmation)
        return res.status(400).json({message: 'Faltan datos'});
    
    const token = req.headers.authorization;

    // llamada a la api de hidra 
    // const response = await fetch('/algo)
    // if(response.ok )
    //  const errorText = await response.text();
    //   throw new Error(`Error ${response.status}: ${errorText}`);    
    //const data = await response.json(); // agregar mensaje de data a la respuesta
    return res.status(200).json({message: "Cambio de contraseña exitoso " + token});
}