// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The site URL is what makes sitemap.xml and the canonical tags correct.
// Change it once here when the real domain is connected.
export default defineConfig({
  site: 'https://www.shikharacademy.in',
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' },
});
