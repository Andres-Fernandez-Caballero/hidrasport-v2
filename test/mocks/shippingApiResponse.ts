export const mockResponse = {
    "results": [
        {
            "price": 3863.86,
            "tax_price": 4675.27,
            "ship_from_type": "Warehouse",
            "ship_from": {
                "id": 1,
                "name": "Shipnow Estrada",
                "type": "warehouse"
            },
            "ship_to_type": null,
            "ship_to": null,
            "shipping_contract": {
                "id": 101,
                "status": "active",
                "account": {
                    "id": 1
                },
                "shipping_service": {
                    "id": 54
                }
            },
            "shipping_service": {
                "id": 54,
                "code": "shipnow_pap",
                "description": "Shipnow - Entrega puerta a puerta",
                "type": "ship_pap",
                "mode": "delivery",
                "category": "economic",
                "carrier": {
                    "code": "shipnow",
                    "description": "Envíos a CABA. Puerta a Puerta",
                    "flexible_dispatching": false,
                    "id": 12,
                    "image_url": null,
                    "name": "shipnow",
                    "tracking_url": "https://www.shipnow.com.ar/track"
                }
            }
        }
    ]
}