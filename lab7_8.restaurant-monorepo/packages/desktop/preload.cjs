const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("menuAPI", {
  getMeta: () => ipcRenderer.invoke("menu:meta"),
  list: (query) => ipcRenderer.invoke("menu:list", query),
  add: (payload) => ipcRenderer.invoke("menu:add", payload),
  remove: (id) => ipcRenderer.invoke("menu:remove", id)
});