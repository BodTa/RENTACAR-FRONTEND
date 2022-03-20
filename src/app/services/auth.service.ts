import { formatDate, getLocaleDateTimeFormat } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { ResponseModel } from '../models/responseModel';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl="https://localhost:44362/api/auth";
  constructor(private httpClient:HttpClient,private helper:JwtHelperService) { }
  login(user:LoginModel):Observable<SingleResponseModel<TokenModel>>{
    let newPath =this.apiUrl+"/login";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,user);
  }

  register(newUser:RegisterModel):Observable<SingleResponseModel<TokenModel>>{
    let newPath=this.apiUrl+"/register";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,newUser);
  }
  isAuthenticated(){
    if(localStorage.getItem("token")){
      const token:any = localStorage.getItem("token");
      const decodedToken=this.helper.decodeToken(token);
      if( new Date( decodedToken['exp']*1000)>new Date()){
        return true;
      }
      else{
        return false;
      }
    }else{
      return false;
    }
  }
}