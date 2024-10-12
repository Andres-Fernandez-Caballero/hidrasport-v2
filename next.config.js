/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['@mercadopago/sdk-react']);
const withPWA = require('next-pwa')({
  dest: 'public',
});

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hidrasport.com.ar',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'hidrasport.com.ar',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "www.afip.gob.ar",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
  env: {
    SERVER_URL: process.env.SERVER_URL,
  },
};

if (process.env.NODE_ENV === 'production') {
  // Aquí podrías agregar configuraciones específicas para producción si es necesario.
  // Por ejemplo: 
  // nextConfig.loader = 'akamai';
  // nextConfig.path = '';
}

module.exports = withTM(withPWA(nextConfig));
