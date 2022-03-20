import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarAdd } from '../models/carAdd';
import { CarDetails } from '../models/carDetails';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarDetailService {
  apiUrl = 'https://localhost:44362/api';

  constructor(private HttpClient: HttpClient) {}
  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + '/cars/getall';
    return this.HttpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarById(carId: number): Observable<SingleResponseModel<Car>> {
    let newPath = this.apiUrl + '/cars/getbyıd?id=' + carId;
    return this.HttpClient.get<SingleResponseModel<Car>>(newPath);
  }
  getDetailById(carId: number): Observable<SingleResponseModel<CarDetails>> {
    let newPath = this.apiUrl + '/cars/getdetailsbyid?id=' + carId;
    return this.HttpClient.get<SingleResponseModel<CarDetails>>(newPath);
  }
  getCarsByBrand(brandId: number): Observable<ListResponseModel<CarDetails>> {
    let newPath = this.apiUrl + '/cars/getbybrand?brandId=' + brandId;
    return this.HttpClient.get<ListResponseModel<CarDetails>>(newPath);
  }
  getCarsByColor(colorId: number): Observable<ListResponseModel<CarDetails>> {
    let newPath = this.apiUrl + '/cars/getbycolor?colorId=' + colorId;
    return this.HttpClient.get<ListResponseModel<CarDetails>>(newPath);
  }
  getCarsByBrandandColor(
    colorId: number,
    brandId: number
  ): Observable<ListResponseModel<CarDetails>> {
    let newPath =
      this.apiUrl +
      '/cars/getbybrandandcolor?brandId=' +
      brandId +
      '&colorId=' +
      colorId;
    return this.HttpClient.get<ListResponseModel<CarDetails>>(newPath);
  }
  addCar(car: CarAdd): Observable<ResponseModel> {
    let newPath = this.apiUrl + '/cars/add';
    return this.HttpClient.post<ResponseModel>(newPath, car);
  }
  getCarDetails(): Observable<ListResponseModel<CarDetails>> {
    let newPath = this.apiUrl + '/cars/cardetails';
    return this.HttpClient.get<ListResponseModel<CarDetails>>(newPath);
  }
  getCarDetailsBy(filter: any): Observable<ListResponseModel<CarDetails>> {
    let newPath = this.apiUrl + '/cars/cardetails?filter=' + filter;
    return this.HttpClient.get<ListResponseModel<CarDetails>>(newPath);
  }
  getCarImageByCarId(carId: any): Observable<ListResponseModel<CarDetails>> {
    let newPath = this.apiUrl + '/cars/cardetails?filter=' + carId;
    return this.HttpClient.get<ListResponseModel<CarDetails>>(newPath);
  }
  getCarBySellerId(
    sellerId: number
  ): Observable<SingleResponseModel<CarDetails>> {
    let newPath = this.apiUrl + '/cars/getbysellerid?id=' + sellerId;
    return this.HttpClient.get<SingleResponseModel<CarDetails>>(newPath);
  }
  getCarsBySellerId(
    sellerId: number
  ): Observable<ListResponseModel<CarDetails>> {
    let newPath = this.apiUrl + '/cars/getcarsbysellerid?id=' + sellerId;
    return this.HttpClient.get<ListResponseModel<CarDetails>>(newPath);
  }
}
