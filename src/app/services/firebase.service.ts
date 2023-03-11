import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';




@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  isLoggedIn = false;

  constructor( private _AngularFireAuth:AngularFireAuth) { }


  async signIn(email:string, password:string){
    await this._AngularFireAuth.signInWithEmailAndPassword(email, password)
    .then(response =>{
      this.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(response.user))
    })
  }

  async signUp(email:string, password:string){
    await this._AngularFireAuth.createUserWithEmailAndPassword(email, password)
    .then( (response) => {
      this.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(response.user))
    })
  }

  logOut(){
    this._AngularFireAuth.signOut();
    localStorage.removeItem('user')
  }
}
