/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains:[
      'hidrasport.com.ar',
      process.env.SERVER_URL,
      "127.0.0.1",
    ],
    loader: 'akamai',
    path: '',
  },
  reactStrictMode: true,
  swcMinify: true,
  env: {
    SERVER_URL: process.env.SERVER_URL,
    WHATSAPP_BUSSINESS_NUMBER: process.env.WHATSAPP_BUSSINESS_NUMBER,
    AFIP_QR: process.env.AFIP_QR,
    AFFIP_DATA_WEB: process.env.AFFIP_DATA_WEB,
  },
}

module.exports = nextConfig
