import { defineConfig } from 'vite'
import path, { resolve } from 'path'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            // match tsconfig "@/*": ["./src/*"]
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'ZerelUI',
            fileName: (format) => `zerel-ui.${format}.js`,
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        },
        // Specify output directory
        outDir: 'dist',
        minify: process.env.NODE_ENV === 'production',
    },
})
