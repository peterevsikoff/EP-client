import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
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
    }
})