const {
    WHATSAPP_BUSSINESS_NUMBER,
    AFIP_QR,
    AFFIP_DATA_WEB,
    SERVER_URL,
} = process.env;

// app
export const HIDRA_SERVER_URL = SERVER_URL ?? '';

// messages
export const WHATSAPP_BUSSINESS = WHATSAPP_BUSSINESS_NUMBER ?? '';

// afip
export const AFIP_QR_URL = AFIP_QR ?? '';
export const AFIP_DATA_WEB_URL = AFFIP_DATA_WEB ?? '';


