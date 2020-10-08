const { app, BrowserWindow, Menu, ipcMain, contextBridge } = require('electron');
const path = require('path');
const { on } = require('process');
const electronGoogleOauth = require('electron-google-oauth');
const { GoogleApis, google } = require('googleapis');
const { classroom } = require('googleapis/build/src/apis/classroom');
const browserWindowParamsGAuth = {
  center: true,
  show: true,
  resizable: false,
  webPreferences: {
      nodeIntegration: false
  }
};
const clientId = '570791553504-hmbek76cshr13vnrf7qorr13ppv95271.apps.googleusercontent.com';
const clientSecret = 'AAyX6AeMA17yg1_ucb2k_iT2';

ipcMain.handle('google-login', ()=>{
  const googleOauth = electronGoogleOauth(browserWindowParamsGAuth);
  googleOauth.getAccessToken(
    ['https://www.googleapis.com/auth/plus.me',
      'profile',
      'email',
      'https://www.googleapis.com/auth/classroom.courses',
      'https://www.googleapis.com/auth/classroom.courses.readonly'],
    clientId,
    clientSecret
  ).then((result) => {
    console.log(result);
  })
})



function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: true,
    },
    icon: __dirname + `/assets/img/logo.ico`
  })
  // empty the menu.
  const menu = Menu.buildFromTemplate([])
  Menu.setApplicationMenu(menu);
  win.maximize();
  win.webContents.openDevTools();
  // and load the index.html of the app.
  win.loadFile(path.join(__dirname, '/src/index.html'));
}


app.whenReady().then(createWindow);
