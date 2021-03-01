import { Component } from '@angular/core';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'projGL';
  

  constructor(){
    
    var firebaseConfig = {
      apiKey: "AIzaSyAR_xAuQug5LoRB7P-pLPdgOIj7MoRzqAI",
      authDomain: "projgl-c484f.firebaseapp.com",
      databaseURL: "https://projgl-c484f-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "projgl-c484f",
      storageBucket: "projgl-c484f.appspot.com",
      messagingSenderId: "799393831927",
      appId: "1:799393831927:web:07b0f8b23748b06133acf2",
      measurementId: "G-4413J0LMEE"
    };
    
    firebase.initializeApp(firebaseConfig);

  }









  

}
