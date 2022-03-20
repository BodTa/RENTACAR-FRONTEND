import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from '../models/image';
import { ImageForAdd } from '../models/imageForAdd';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  apiUrl = 'https://localhost:44362/api/images';
  constructor(private httpClient: HttpClient) {}
  getImages(): Observable<ListResponseModel<Image>> {
    let newPath = this.apiUrl + '/getall';
    return this.httpClient.get<ListResponseModel<Image>>(newPath);
  }
  getImagesByCarId(carId: any): Observable<ListResponseModel<Image>> {
    let newPath = this.apiUrl + '/getbycarid?carId=' + carId;
    return this.httpClient.get<ListResponseModel<Image>>(newPath);
  }
  addImages(file: FormData): Observable<ResponseModel> {
    let newPath = this.apiUrl + '/add';
    //@ts-nocheck
    //@ts-ignore
    return this.httpClient.post<ResponseModel>(newPath, file);
  }
}
