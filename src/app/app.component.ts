import { Component, OnInit } from '@angular/core';
import { firebase } from '@firebase/app'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyCXJHWcd0CvOYnC9Ff4LwUaWagMOsgV2G8",
      authDomain: "ng-recipe-11a27.firebaseapp.com"
    });
  }
}
