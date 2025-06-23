import { defineConfig } from 'vite'
import path, { resolve } from 'path'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        dts({ rollupTypes: true, tsconfigPath: './tsconfig.lib.json' }),
    ],
    resolve: {
        alias: {
            // match tsconfig "@/*": ["./src/*"]
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        copyPublicDir: false,
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'ZerelUI',
        },
        rollupOptions: {
            external: ['react', 'react/jsx-runtime', 'react-dom'],
            // output: {
            //     globals: {
            //         react: 'React',
            //         'react-dom': 'ReactDOM',
            //     },
            // },
        },
        // Specify output directory
        // outDir: 'dist',
        // minify: process.env.NODE_ENV === 'production',
    },
})
