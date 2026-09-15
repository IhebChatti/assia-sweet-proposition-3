import type { NextConfig } from 'next';

/**
 * Locally, `API_ORIGIN` (see `.env.local`) proxies `/api/*` to Nest.
 * On Netlify, leave `API_ORIGIN` unset so Next.js route handlers serve the API.
 */
const apiOrigin = process.env.API_ORIGIN?.trim();

const config: NextConfig = {
  async rewrites() {
    if (!apiOrigin) {
      return [];
    }
    return [
      {
        source: '/api/:path*',
        destination: `${apiOrigin}/api/:path*`,
      },
    ];
  },
};

export default config;
