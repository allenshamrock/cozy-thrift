/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // allows external images from this hostname
    domains: ["i.pinimg.com"],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "utfs.io",
    //   },
    // ],
  },
};

export default nextConfig;
