type ShipType = 'ship_pap' | 'ship_pas';

const shipAmountFetcher = async (
    weigth: number,
    zipCode: string,
    shipType: ShipType = 'ship_pap',

) => {
    const res = await fetch(`https://api.shipnow.com.ar/shipping_options?weight=${weigth}&to_zip_code=${zipCode}&types=${shipType}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " // + api_key
        }   
    })
    if(!res.ok) throw new Error('Error al consultar con el modulo de envios')

    return res.json();
}

export default shipAmountFetcher;
