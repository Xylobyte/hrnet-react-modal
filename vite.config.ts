import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import * as path from "node:path";
import dts from "unplugin-dts/vite"

// https://vite.dev/config/
export default defineConfig({
	build: {
		lib: {
			entry: path.resolve(__dirname, "index.ts"),
			name: "hrnet-react-modal",
			fileName: (format) => `index.${format}.js`
		},
		rollupOptions: {
			external: ["react", "react-dom"],
			output: {
				globals: {
					react: "React",
					"react-dom": "ReactDOM"
				}
			}
		},
		sourcemap: false,
		emptyOutDir: true
	},
	plugins: [react(), dts({tsconfigPath: './tsconfig.build.json', insertTypesEntry: true})],
});
