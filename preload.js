const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getNotes: () => ipcRenderer.invoke('getNotes'),
  saveNotes: (notes) => ipcRenderer.invoke('saveNotes', notes),
});
