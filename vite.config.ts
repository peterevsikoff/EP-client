import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Загружаем env файлы в текущий режим (mode)
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    server: {
      port: parseInt(env.VITE_CLIENT_PORT) || 3000, // Клиент на 3000
      host: env.VITE_CLIENT_HOST || 'localhost',
      proxy: {
        // Прокси для API запросов к серверу на 3001
        '/api': {
          target: env.VITE_SERVER_URL || 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
        }
      }
    },
    resolve: {
      alias: [
        { find: 'components', replacement: path.resolve(__dirname, 'src/components') },
        { find: 'types', replacement: path.resolve(__dirname, 'src/types') },
        { find: 'action-creators', replacement: path.resolve(__dirname, 'src/redux/action-creators') },
        { find: 'action-types', replacement: path.resolve(__dirname, 'src/redux/action-types') },
        { find: 'selectors', replacement: path.resolve(__dirname, 'src/redux/selectors') },
        { find: 'utils', replacement: path.resolve(__dirname, 'src/utils') },
        { find: 'hooks', replacement: path.resolve(__dirname, 'src/hooks') },
        { find: '@scss', replacement: path.resolve(__dirname, 'src/scss') },
      ]
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "@scss/variables" as *;
          @use "@scss/mixins" as *;
          `,
        }
      }
    },
    // Опционально: можно экспортировать env переменные для использования в коде
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    }
  }
})