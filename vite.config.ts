import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(({ mode }) => {
  // If building for GitHub Actions or production, ensure relative base './' or repo path
  // In AI Studio, BASE_PATH may be set for sandbox routing
  const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
  const basePath = isGitHubActions
    ? (process.env.GITHUB_REPOSITORY ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/` : './')
    : (process.env.BASE_PATH || './');

  return {
    plugins: [react(), tailwindcss()],
    base: basePath,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: true as const,
      // HMR can be disabled via the DISABLE_HMR env var; file watching is
      // turned off alongside it to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
