import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

function resolveGitHubPagesBase() {
  const repository = process.env.GITHUB_REPOSITORY;
  if (!repository) return '/';

  const repoName = repository.split('/')[1];
  if (!repoName || repoName.endsWith('.github.io')) return '/';
  return `/${repoName}/`;
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  const base =
    env.VITE_BASE_PATH ||
    (process.env.GITHUB_ACTIONS === 'true' ? resolveGitHubPagesBase() : '/');

  return {
    plugins: [react(), tailwindcss()],
    base,
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify - file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
