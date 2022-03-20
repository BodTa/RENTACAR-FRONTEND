import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarDetails } from 'src/app/models/carDetails';
import { CarDetailService } from 'src/app/services/cardetail.service';

@Component({
  selector: 'app-usercars',
  templateUrl: './usercars.component.html',
  styleUrls: ['./usercars.component.css'],
})
export class UsercarsComponent implements OnInit {
  user: any;
  cars: CarDetails[];
  constructor(private carService: CarDetailService) {}

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.user = JSON.parse(this.user);
  }
  getCarsBySellerId(sellerId: number) {
    this.carService.getCarsBySellerId(sellerId).subscribe((res) => {
      this.cars = res.data;
    });
  }
}
