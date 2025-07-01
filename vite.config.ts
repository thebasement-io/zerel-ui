import { defineConfig } from 'vite'
import path, { resolve } from 'path'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'
import preserveDirectives from 'rollup-preserve-directives'
import { glob } from 'glob'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        viteStaticCopy({
            targets: [
                {
                    src: 'src/theme.css',
                    rename: 'theme.css',
                    dest: '.',
                },
            ],
        }),
        preserveDirectives(),
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
            entry: {
                // Individual component entries
                ...Object.fromEntries(
                    glob.sync('src/components/ui/*.tsx').map((file: string) => [
                        // Create clean entry name: src/components/ui/button.tsx -> button
                        path.basename(file, '.tsx'),
                        resolve(__dirname, file),
                    ]),
                ),
                // Also include utilities
                utils: resolve(__dirname, 'src/lib/utils.ts'),
                'use-mobile': resolve(__dirname, 'src/hooks/use-mobile.ts'),
                'use-zform': resolve(__dirname, 'src/hooks/use-zform.ts'),
            },
            name: 'ZerelUI',
            formats: ['es'],
        },
        rollupOptions: {
            external: [
                'react',
                'react/jsx-runtime',
                'react-dom',
                'tailwindcss',
            ],
            output: {
                preserveModules: false, // We want individual bundles, not preserved modules
                entryFileNames: '[name].js',
                assetFileNames: '[name].[ext]',
            },
        },
        // Specify output directory
        // outDir: 'dist',
        // minify: process.env.NODE_ENV === 'production',
    },
})
