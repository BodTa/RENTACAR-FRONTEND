import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCart } from '../models/creditcard';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiUrl="https://localhost:44362/api/creditcarts";
  constructor(private httpClient:HttpClient) { }
  
  PayRentCost(creditcard:any):Observable<ResponseModel>{
    let newUrl=this.apiUrl+"/pay";
    return this.httpClient.post<ResponseModel>(newUrl,creditcard);
  }
  isMoneyEnough(creditcard:any):Observable<ResponseModel>{
    let newUrl=this.apiUrl+"/isenough";
    return this.httpClient.post<ResponseModel>(newUrl,creditcard);
  }
}
