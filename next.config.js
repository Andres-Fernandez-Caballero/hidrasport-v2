/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "hidrasport.com.ar", 
      "127.0.0.1"
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.afip.gob.ar",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      }
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
  env: {
    SERVER_URL: process.env.SERVER_URL,
  },
};

if (process.env.NODE_ENV === "production") {
  // (nextConfig.loader = "akamai"), (nextConfig.path = "");
}

module.exports = nextConfig;
