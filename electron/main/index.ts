import { app, BrowserWindow, shell, ipcMain, ipcRenderer } from "electron"
import { fileURLToPath } from "node:url"
import path from "node:path"
import os from "node:os"
import { getDatabaseConnection, runMigrations } from "./database/database"
import { handleFeatures } from "./exposes/handleServices"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, "../..")

export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron")
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist")
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
   ? path.join(process.env.APP_ROOT, "public")
   : RENDERER_DIST

// Disable GPU Acceleration for Windows 7
if (os.release().startsWith("6.1")) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
   app.quit()
   process.exit(0)
}

let win: BrowserWindow | null = null
const preload = path.join(__dirname, "../preload/index.mjs")
const indexHtml = path.join(RENDERER_DIST, "index.html")

console.log(__dirname)

async function createWindow() {
   win = new BrowserWindow({
      title: "Main window",
      icon: path.join(process.env.VITE_PUBLIC, "favicon.ico"),
      webPreferences: {
         preload,
         devTools: true,
         nodeIntegration: false,
         contextIsolation: true,
      },
   })

   win.maximize()

   win.webContents.openDevTools()

   if (VITE_DEV_SERVER_URL) {
      win.loadURL(VITE_DEV_SERVER_URL)
   } else {
      win.loadFile(indexHtml)
   }

   // Make all links open with the browser, not with the application
   win.webContents.setWindowOpenHandler(({ url }) => {
      if (url.startsWith("https:")) shell.openExternal(url)
      return { action: "deny" }
   })
   win.webContents.on("will-navigate", (event, url) => {})
}

app.whenReady().then(() => {
   getDatabaseConnection()
   runMigrations()
   createWindow()
   handleFeatures(ipcMain)
})

app.on("window-all-closed", () => {
   win = null
   if (process.platform !== "darwin") app.quit()
})

app.on("second-instance", () => {
   if (win) {
      // Focus on the main window if the user tried to open another
      if (win.isMinimized()) win.restore()
      win.focus()
   }
})

app.on("activate", () => {
   const allWindows = BrowserWindow.getAllWindows()
   if (allWindows.length) {
      allWindows[0].focus()
   } else {
      createWindow()
   }
})

// New window example arg: new windows url
ipcMain.handle("open-win", (_, arg) => {
   const childWindow = new BrowserWindow({
      webPreferences: {
         preload,
         nodeIntegration: false,
         contextIsolation: true,
      },
   })

   if (VITE_DEV_SERVER_URL) {
      childWindow.loadURL(`${VITE_DEV_SERVER_URL}#${arg}`)
   } else {
      childWindow.loadFile(indexHtml, { hash: arg })
   }
})
