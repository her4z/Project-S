const {ipcRenderer, ipcMain} = require('electron');
const btnGoogleLogin = document.getElementById('btnGoogleLogin');
const ctnCourses = document.getElementById('ctnCourses');
const ctnLogin = document.getElementById('ctnLogin');

btnGoogleLogin.addEventListener('click', ()=>{
    ipcRenderer.send('google-login');
})

ipcRenderer.on('google-login-reply', (event, arg)=>{
    ctnLogin.style.visibility = 'hidden';
    ctnCourses.style.visibility = 'visible';
    console.log(arg);
    for(let course of arg){
        if(course.courseState === "ACTIVE"){
            ctnCourses.insertAdjacentHTML('afterend',
            `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${course.name}</h5>
                    <h6 class="card-subtitle">Codigo: ${course.enrollmentCode}</h6>
                    <p class="card-text">${course.section}</p>
                </div>
            </div>
            `
            );
        }
    }
})




