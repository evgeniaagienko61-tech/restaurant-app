import path from "node:path";
import { fileURLToPath } from "node:url";
import { app, BrowserWindow, ipcMain } from "electron";
import { MenuService } from "@restaurant/core";
import { FileStorageAdapter } from "./fileStorageAdapter.js";
import { createHandlers } from "./ipcHandlers.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function createWindow() {
  const win = new BrowserWindow({
    width: 820,
    height: 640,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile(path.join(__dirname, "renderer", "index.html"));
}

app.whenReady().then(() => {
  const storagePath = path.join(app.getPath("userData"), "menu.json");
  const service = new MenuService(new FileStorageAdapter(storagePath));
  const handlers = createHandlers(service);

  ipcMain.handle("menu:meta", () => handlers.getMeta());
  ipcMain.handle("menu:list", (_event, query) => handlers.list(query));
  ipcMain.handle("menu:add", (_event, payload) => handlers.add(payload));
  ipcMain.handle("menu:remove", (_event, id) => handlers.remove(id));

  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});