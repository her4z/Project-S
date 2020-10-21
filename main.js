const { app, BrowserWindow, Menu, ipcMain, screen, net, session, ipcRenderer} = require('electron');
const path = require('path');
const { on } = require('process');
const electronGoogleOauth = require('electron-google-oauth');
const fs = require('fs');

const browserWindowParamsGAuth = {
  center: true,
  show: true,
  resizable: false,
  webPreferences: {
      nodeIntegration: false
  },
};
const clientId = '570791553504-hmbek76cshr13vnrf7qorr13ppv95271.apps.googleusercontent.com';
const clientSecret = 'AAyX6AeMA17yg1_ucb2k_iT2';

ipcMain.on('google-login', (event)=>{
  const googleOauth = electronGoogleOauth(browserWindowParamsGAuth);
  googleOauth.getAccessToken(
    [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/classroom.courses',
      'https://www.googleapis.com/auth/classroom.courses.readonly'],
    clientId,
    clientSecret
  ).then((result) => {
    fs.writeFile('token.json', JSON.stringify(result), (err)=>{
      if(err) throw err;
      console.log('Saved file');
    }) 
    InitialRequest(result, event);

    
  });
})

async function InitialRequest(client, event){
  let req = await net.request(`https://classroom.googleapis.com/v1/courses?access_token=${client.access_token}`);
  req.on('response', (response) =>{
    response.on('data', (buffer)=>{
      let buf2json = JSON.parse(buffer.toString('utf8'));
      const courses = buf2json.courses;
      event.reply('google-login-reply', courses);
    })
  })
  req.end()
  // req = await net.request(`https://people.googleapis.com/v1/people/me?personFields=names?access_token=${client.access_token}`);
  // req.on('response', (response) =>{
  //   response.on('data', (buffer)=>{
  //     console.log(buffer.toString('utf8'));
  //   })
  // })
  // req.end()

  
}


function createWindow () {
  const primaryDisplay = screen.getPrimaryDisplay();
  // Create the browser window.
  const win = new BrowserWindow({
    width: primaryDisplay.size.width,
    height: primaryDisplay.size.height,
    webPreferences: {
      nodeIntegration: true,
    },
    icon: __dirname + `/assets/img/logo.ico`
  })
  // empty the menu, maximize window and open chromium dev tools.
  const menu = Menu.buildFromTemplate([])
  Menu.setApplicationMenu(menu);
  win.maximize();
  // and load the index.html of the app.
  win.loadFile(path.join(__dirname, '/src/index.html'));
}

app.on('ready', ()=>{
  session.defaultSession.setUserAgent('Chrome');
})


app.whenReady().then(createWindow);
