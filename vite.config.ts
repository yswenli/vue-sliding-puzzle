
import {resolve} from 'path'
import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue';

module.exports = defineConfig({
  plugins: [
    vue()
    ],
  resolve: { dedupe: ['vue'] },
  build: {
    lib: {
      name: 'vue3PuzzleVcode',
      entry: resolve(__dirname, 'src/lib/main.ts'),
      fileName: (format) => `vue-sliding-puzzle.${format}.js`
    },
    cssCodeSplit: true,
    
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})