import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {
  rents:Rental[];
  constructor(private rentalService:RentalService) { }

  ngOnInit(): void {
    this.getRents();
  }
  getRents(){
    this.rentalService.getRents().subscribe(response=>{
      this.rents=response.data;
    })
  }

}
