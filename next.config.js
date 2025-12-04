/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Yahan hum external image domains ko allow kar rahe hain
    domains: [
      'i.ibb.co', 
      'ik.imagekit.io', 
      'placehold.co', 
      'www.svgrepo.com',
      'via.placeholder.com'
    ],
    dangerouslyAllowSVG: true, // SVG icons ke liye
  },
};

module.exports = nextConfig;

