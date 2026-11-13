const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

// Шлях до файлу збереження у теці даних застосунку
function getDataFilePath() {
    return path.join(app.getPath('userData'), 'restaurant-data.json');
}

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 950,
        height: 750,
        title: 'Ресторанний менеджер Desktop',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));
}

// IPC: завантаження даних
ipcMain.handle('restaurant:load', () => {
    const filePath = getDataFilePath();
    if (!fs.existsSync(filePath)) {
        return [];
    }
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Помилка читання файлу:', error);
        return [];
    }
});

// IPC: збереження даних
ipcMain.handle('restaurant:save', (event, items) => {
    const filePath = getDataFilePath();
    try {
        fs.writeFileSync(filePath, JSON.stringify(items, null, 2), 'utf-8');
        return true;
    } catch (error) {
        console.error('Помилка збереження файлу:', error);
        return false;
    }
});

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});