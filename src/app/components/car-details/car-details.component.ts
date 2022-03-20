import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isoveropacity } from 'src/app/animations/animations';
import { CarDetails } from 'src/app/models/carDetails';
import { Image } from 'src/app/models/image';
import { UserDetails } from 'src/app/models/userDetails';
import { CarDetailService } from 'src/app/services/cardetail.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
  animations: [isoveropacity],
})
export class CarDetailsComponent implements OnInit {
  a: boolean;
  a2: boolean;
  car: CarDetails;
  carId: any;
  firstName: string;
  carName: string;
  seller: UserDetails;
  modelYear: string;
  carImages: Image[];
  constructor(
    private carService: CarDetailService,
    private userService: UserService,
    private activatedRote: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRote.params.subscribe((params) => {
      if (params['carId']) {
        this.carId = params['carId'];
        this.getCar(this.carId);
      }
    });
  }
  getCar(carId: number) {
    this.carService.getDetailById(carId).subscribe((res) => {
      this.car = res.data;
      this.carName = res.data.carName;
      this.carImages = res.data.images;
      this.modelYear = JSON.stringify(this.car.modelYear);

      this.userService.getUserById(this.car.sellerId).subscribe((response) => {
        this.seller = response.data;
        this.firstName = this.seller.firstName;
      });
    });
  }
  isOver(a: boolean) {
    this.a = a;
  }
  isOver2(a: boolean) {
    this.a2 = a;
  }
  check(): boolean {
    return this.a;
  }
  check2(): boolean {
    return this.a2;
  }
}
