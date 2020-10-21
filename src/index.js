const {ipcRenderer, ipcMain} = require('electron');
const btnGoogleLogin = document.getElementById('btnGoogleLogin');
const btnPingPong = document.getElementById('btnPingPong');

btnGoogleLogin.addEventListener('click', ()=>{
    ipcRenderer.send('google-login');
})

ipcRenderer.on('google-login-reply', (event, arg)=>{
    console.log(arg);
})




