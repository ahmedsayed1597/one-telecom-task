import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private  _Router:Router, private _FormBuilder:FormBuilder, private _FirebaseService:FirebaseService) { }

  logInForm:FormGroup;
  responseMessage: any
  isLogedIn:boolean = false;

  ngOnInit(): void {
    this.logInForm = this._FormBuilder.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)]),
    });
  }

  async onSignIn() {
    if (this.logInForm.valid == true) {
      await this._FirebaseService.signIn(this.logInForm.value['email'], this.logInForm.value['password'])
      if (this._FirebaseService.isLoggedIn) {
        this.isLogedIn = true;
        this._Router.navigate(['panel/posts/all'])
      }
    }
  }

  checkErrorInForm(input:string){
    if(this.logInForm.controls[input].errors) return true;
    else return false;   
  }

  checkErrorInFormAndType(input:string, errorType:string){
    if(this.logInForm.controls[input].hasError(errorType)) return true;
    else return false;
  }

  checkErrorIfFormTouch(input:string){
    if(this.logInForm.controls[input].touched) return true;
    else return false;
  }

}
