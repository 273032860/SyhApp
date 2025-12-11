import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { reactGrab } from "react-grab/plugins/vite";
import { codeInspectorPlugin } from 'code-inspector-plugin';
import threeUniformGui from 'tsl-uniform-ui-vite-plugin'


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    threeUniformGui({ 
      devOnly: true,     // 仅在开发模式下活跃
      persistent: true,   //在本地存储中保存配置
      // presets: true,      // 启用预设管理
      draggable: true,    // 启用拖拽
    }), // ✅ BEFORE react()
    react(),
    tailwindcss(),
    reactGrab(),
    // codeInspectorPlugin({
    //   bundler: 'vite',
    // }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
