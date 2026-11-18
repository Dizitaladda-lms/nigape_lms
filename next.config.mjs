/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/Contactus",
        destination: "/contact-us",
        permanent: true,
      },
      {
        source: "/Form/form",
        destination: "/contact-us",
        permanent: true,
      },
      {
        source: "/try",
        destination: "/courses",
        permanent: true,
      },
      {
        source: "/ai-ppt-maker-free",
        destination: "/courses/ai-literacy-for-everyone",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
