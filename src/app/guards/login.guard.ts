import { getLocaleDateTimeFormat } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authService:AuthService,private toastrService:ToastrService,private router:Router,private helper:JwtHelperService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
    if(this.authService.isAuthenticated()){
      const token:any = localStorage.getItem("token");
      const decodedToken=this.helper.decodeToken(token);
      if( new Date( decodedToken['exp']*1000)>new Date()){
        return true;
      }
      else{
        this.router.navigate(["login"])
        this.toastrService.error("Sisteme 10 dakika sonra tekrar giriş yapmanız gerekmektedir.","UYARI");
        return false;
      }
    }
    else{
      this.router.navigate(["login"])
      this.toastrService.error("Sisteme giriş yapmanız gerekmektedir","UYARI");
      return false;
    }
  }
  
}
