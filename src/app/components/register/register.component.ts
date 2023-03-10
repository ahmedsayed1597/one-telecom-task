import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _Router: Router, private _FirebaseService: FirebaseService, private _FormBuilder: FormBuilder) { }

  responseMessage: any;
  registerationForm: FormGroup;
  isSignedIn = false;

  ngOnInit(): void {
    this.registerationForm = this._FormBuilder.group({
      firstName: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      lastName: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required,Validators.minLength(6)]),
      password_repeat: new FormControl("", [Validators.required]),
    });
  }

  checkPassswordConfirmation() {
    if (this.registerationForm.value['password'] == this.registerationForm.value['password_repeat']) return true;
    else return false;
  }

  checkErrorInForm(input: string) {
    if (this.registerationForm.controls[input].errors) return true;
    else return false;
  }

  checkErrorInFormAndType(input: string, errorType: string) {
    if (this.registerationForm.controls[input].hasError(errorType)) return true;
    else return false;
  }

  checkErrorIfFormTouch(input: string) {
    if (this.registerationForm.controls[input].touched) return true;
    else return false;
  }

  async onSignUp() {
    if (this.registerationForm.valid == true && this.checkPassswordConfirmation()) {
      await this._FirebaseService.signUp(this.registerationForm.value['email'], this.registerationForm.value['password'])
      if (this._FirebaseService.isLoggedIn) {
        this._Router.navigate(['Login'])
        this.isSignedIn = true;
      }
    }
  }


  handleLogOut(){
    this.isSignedIn = false;
    this._FirebaseService.logOut();
  }
}
