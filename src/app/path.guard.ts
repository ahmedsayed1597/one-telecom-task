import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PathGuard implements CanActivate {
  constructor(private _Router:Router){}

  canActivate(): boolean{
    if(localStorage.getItem('user') !== null){
      return true;
    }
    this._Router.navigate(['Login'])
    return false;
  }
  
}
