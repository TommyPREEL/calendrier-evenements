// Modules to control application life and create native browser window

// Création d'objets venant de librairies
const {app, BrowserWindow, ipcMain, Menu} = require('electron')
const path = require('path')

// Déclaration des windows main et view
let mainWindow = null;
let viewWindow = null;
let addWindow = null;

// Création du template du menu pour la page principale
const templateMain = [
  {
      label: "Fichier",
      submenu: [
          {
              label: "Creer un evenement",
              click: () => {
                createAddWindow()
              }
          },
          {
              type: "separator"
          },
          {
              label: "Quitter",
              role: "quit"
          }
      ]
    },
    {
      label: "Outil d'inspection",
      role: "toggleDevTools"
    }
  
]
// Création du template du menu pour les autres pages que la main
const templateSub = [
  {
    label: "Outils",
    role: "toggleDevTools"
  }
]

// Construction du menu sur un template
const menuMain = Menu.buildFromTemplate(templateMain)
const menuSub = Menu.buildFromTemplate(templateSub)

// Fermeture de la page active et rechargement de la page principale
ipcMain.handle("event-add-close", (evt, params) => {
  BrowserWindow.fromWebContents(evt.sender).close()
  // reload la page main
  mainWindow.reload()
})

// Fermeture de la page active et rechargement de la page principale
ipcMain.handle("event-view-close", (evt, params) => {
  BrowserWindow.fromWebContents(evt.sender).close()
  // reload la page main
  mainWindow.reload()
})

// Fermeture de la page active et rechargement de la page principale
ipcMain.handle("event-edit-close", (evt, params) => {
  BrowserWindow.fromWebContents(evt.sender).close()
  viewWindow.close()
  // reload la page main
  mainWindow.reload()
})

// Création de la page de creation d'un evenement
ipcMain.handle("event-add", (evt, params) => {
  createAddWindow()
  //const winAdd = BrowserWindow.fromWebContents(evt.sender)
  //menuSub.popup(winAdd)
})

ipcMain.handle("event-view", (evt, params) => {
  createViewWindow(params)

})
ipcMain.handle("event-edit", (evt, params) => {
  createEditWindow(params)

})

// Création de la page de creation d'un evenement
function createAddWindow () {
  addWindow = new BrowserWindow({
    width: 800,
    height: 600,
    parent: mainWindow,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  // and load the index.html of the app.
  addWindow.loadFile('add.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// Création de la page de vue d'un evenement
function createViewWindow (params) {
  // Create the browser window.
  viewWindow = new BrowserWindow({
    width: 800,
    height: 600,
    parent: mainWindow,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  viewWindow.loadFile('view.html', {query: {"data": JSON.stringify(params)}})


  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// Création de la page d'edition d'un evenement
function createEditWindow (params) {
  // Create the browser window.
  const editWindow = new BrowserWindow({
    width: 800,
    height: 600,
    parent: viewWindow,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  editWindow.loadFile('edit.html', {query: {"data": JSON.stringify(params)}})


  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// Création de la page principale
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

Menu.setApplicationMenu(menuMain)
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
