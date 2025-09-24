import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    createHtmlPlugin({})
  ],
  server: {
    host: 'true',
    open: true,
    cors: true,
    // https: true,
  }
})
