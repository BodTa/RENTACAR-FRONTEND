import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserDetails } from '../models/userDetails';
import { UserForUpdate } from '../models/userforupdate';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'https://localhost:44362/api/users';
  constructor(private httpClient: HttpClient) {}

  getUserById(id: number): Observable<SingleResponseModel<UserDetails>> {
    let newPath = this.apiUrl + '/getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<UserDetails>>(newPath);
  }
  getUserByEmail(email: string): Observable<SingleResponseModel<UserDetails>> {
    let newPath = this.apiUrl + '/getbyemail?email=' + email;
    return this.httpClient.get<SingleResponseModel<UserDetails>>(newPath);
  }
  update(user: UserForUpdate, id: number): Observable<ResponseModel> {
    let newPath = this.apiUrl + '/update';
    return this.httpClient.post<ResponseModel>(newPath, user && id);
    1;
  }
  updatePassword(
    password: string,
    oldpassword: string,
    customerId: number
  ): Observable<ResponseModel> {
    let newPath = this.apiUrl + '/updatepassword';
    return this.httpClient.post<ResponseModel>(
      newPath,
      password && oldpassword && customerId
    );
  }
}
