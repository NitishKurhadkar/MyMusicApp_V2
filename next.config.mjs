/** @type {import('next').NextConfig} */
const headers = [
  { key: "Access-Control-Allow-Credentials", value: "true" },
  { key: "Access-Control-Allow-Origin", value: "*" },
  { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
  { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
];
const nextConfig = {
  async headers() {
    return [
      {
        source: "/my-music-app-server-6yia.vercel.app/:path*",
        headers: headers
      },
      {
        source: "/my-music-app-v2.vercel.app/:path*",
        headers: headers
      },
      {
        source: "/localhost:3000/:path*",
        headers: headers
      }
    ]
  }
};

export default nextConfig;
