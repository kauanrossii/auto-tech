import fs from "node:fs"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import electron from "vite-plugin-electron/simple"
import pkg from "./package.json"

export default defineConfig(({ command }) => {
   fs.rmSync("dist-electron", { recursive: true, force: true })

   const isServe = command === "serve"
   const isBuild = command === "build"
   const sourcemap = isServe || !!process.env.VSCODE_DEBUG

   return {
      resolve: {
         alias: {
            "@shared": "/shared",
            "@shared/*": "/shared/*",
            "@": "/src",
            "@src": "/src",
            "@src/*": "/src/*",
            "@modules": "/src/modules",
            "@modules/*": "/src/modules/*",
         },
      },
      css: {
         preprocessorOptions: {
            scss: {
               additionalData: `@use 'vuetify/styles' as *;`,
            },
         },
      },
      plugins: [
         vue(),
         electron({
            main: {
               // Shortcut of `build.lib.entry`
               entry: "electron/main/index.ts",
               onstart({ startup }) {
                  if (process.env.VSCODE_DEBUG) {
                     console.log(
                        /* For `.vscode/.debug.script.mjs` */ "[startup] Electron App"
                     )
                  } else {
                     startup()
                  }
               },
               vite: {
                  build: {
                     sourcemap,
                     minify: isBuild,
                     outDir: "dist-electron/main",
                     rollupOptions: {
                        // Some third-party Node.js libraries may not be built correctly by Vite, especially `C/C++` addons,
                        // we can use `external` to exclude them to ensure they work correctly.
                        // Others need to put them in `dependencies` to ensure they are collected into `app.asar` after the app is built.
                        // Of course, this is not absolute, just this way is relatively simple. :)
                        external: [
                           ...Object.keys(
                              "dependencies" in pkg ? pkg.dependencies : {}
                           ),
                           "fs",
                           "vuetify",
                        ],
                     },
                  },
               },
            },
            preload: {
               // Shortcut of `build.rollupOptions.input`.
               // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
               input: "electron/preload/index.ts",
               vite: {
                  build: {
                     sourcemap: sourcemap ? "inline" : undefined,
                     minify: isBuild,
                     outDir: "dist-electron/preload",
                     rollupOptions: {
                        external: Object.keys(
                           "dependencies" in pkg ? pkg.dependencies : {}
                        ),
                     },
                  },
               },
            },
            renderer: {},
         }),
      ],
      server:
         process.env.VSCODE_DEBUG &&
         (() => {
            const url = new URL(pkg.debug.env.VITE_DEV_SERVER_URL)
            return {
               host: url.hostname,
               port: +url.port,
            }
         })(),
      clearScreen: false,
   }
})
