const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('restaurantAPI', {
    loadItems: () => ipcRenderer.invoke('restaurant:load'),
    saveItems: (items) => ipcRenderer.invoke('restaurant:save', items)
});