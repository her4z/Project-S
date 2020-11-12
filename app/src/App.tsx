import React from "react";
import Button from '@material-ui/core/Button';
import './css/App.css';
//const {ipcRenderer} = require('electron');



export default class App extends React.Component<{},{}>{

  constructor(props : any){
    super(props);
    this.state = {
    };
    this.login = this.login.bind(this);
  }

  private login(){
    // ipcRenderer.send('google-login');
    // ipcRenderer.on('google-login-reply', (event:any, arg:any)=>{
    //   //TODO: Cambiar a manejo de estados.
    //   const ctnLogin = document.getElementById('ctnLogin');
    //   const ctnCourses = document.getElementById('ctnCourses');
    //   if(ctnLogin){
    //     ctnLogin.style.visibility = 'hidden';
    //   }
    //   if(ctnCourses){
    //     ctnCourses.style.visibility = 'visible';
    //   }
    //   for(let course of arg){
    //     if(course?.courseState === "ACTIVE"){
    //       ctnCourses?.insertAdjacentHTML('afterend',
    //       `
    //       <div class="card">
    //           <div class="card-body">
    //               <h5 class="card-title">${course.name}</h5>
    //               <h6 class="card-subtitle">Codigo: ${course.enrollmentCode}</h6>
    //               <p class="card-text">${course.section}</p>
    //           </div>
    //       </div>
    //       `
    //       );
    //     }
    //   }
      
    // })
  }
  
  render(){
    return(
      <div className="container">
        <h1>Project Sanzwich</h1>
        <div className="ctnLogin">
          <Button className="btnGoogleLogin" variant="contained" color="primary" onClick={this.login}>
            <img className="imgGoogleLogo"></img>
            Sign in with Google
          </Button>
        </div>
        <div className="ctnCourses"></div>
        <footer>
          <img className="imgSanzwichLogo"></img>
        </footer>
      </div>
    )
  }

}


