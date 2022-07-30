import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import rollupNodePolyFill from 'rollup-plugin-polyfill-node';
// import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
// import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
            global: 'globalThis'
        },
        // Enable esbuild polyfill plugins
        plugins: [
            // NodeGlobalsPolyfillPlugin({
            //     process: true,
            //     buffer: true
            // }),
            // NodeModulesPolyfillPlugin()
        ]
    }
},

    server:{
        proxy:{
        '^/api/.+':{
            target:"http://localhost:5000",
            changeOrigin:true,
        }
    }
    }
})
