const {ipcRenderer, ipcMain} = require('electron');
const btnGoogleLogin = document.getElementById('btnGoogleLogin');

btnGoogleLogin.addEventListener('click', ()=>{
    ipcRenderer.invoke('google-login').then((res) =>{
        
    })
})