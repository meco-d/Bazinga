import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) { }

  GoogleAuth() {
    try {
      this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() => {
        location.replace('/dashboard');
      });
      // return true;
    } catch (error) {
      // return false;
    }
  }
}
