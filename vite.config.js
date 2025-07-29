"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vite_1 = require("vite");
const plugin_vue_1 = __importDefault(require("@vitejs/plugin-vue"));
const path_1 = __importDefault(require("path"));
exports.default = (0, vite_1.defineConfig)({
    root: path_1.default.resolve(__dirname, 'src/frontend'),
    plugins: [(0, plugin_vue_1.default)()],
    build: {
        outDir: path_1.default.resolve(__dirname, 'dist'),
        emptyOutDir: true,
    },
    resolve: {
        alias: {
            '@': path_1.default.resolve(__dirname, 'src/frontend'),
        },
    },
    server: {
        allowedHosts: [process.env.BACK_URL]
    }
});
