import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl="https://localhost:44362/api/rentals"
  constructor(private httpClient:HttpClient) { }

  rentCar(newRent:any):Observable<ResponseModel>{
    let newPath=this.apiUrl+"/add"
    return this.httpClient.post<ResponseModel>(newPath,newRent);
  }
  isRentable(carId:number,rentDate:Date):Observable<ResponseModel>{
    let newPath = this.apiUrl+"/isrentable?carId="+carId+"&rentDate="+rentDate;
   return this.httpClient.get<ResponseModel>(newPath);
  }
  getRents():Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl+"/getall";
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }
}
