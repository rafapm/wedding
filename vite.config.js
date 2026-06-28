import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // When deploying to a custom domain (e.g. juneandrafael.com), serve from the root.
  base: '/',
});
