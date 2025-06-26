const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const Store = require('electron-store');
const store = new Store();

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

ipcMain.handle('getNotes', () => {
  return store.get('notes') || [];
});

ipcMain.handle('saveNotes', (event, notes) => {
  store.set('notes', notes);
});
