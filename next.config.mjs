/** @type {import('next').NextConfig} */
// next.config.mjs

const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/users/signup',
          destination: '/api/users/signup.ts',
        },
        // Add more rewrite rules as needed
      ];
    },
  };
  
  export default nextConfig;
  
