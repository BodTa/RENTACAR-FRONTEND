import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetailService } from 'src/app/services/cardetail.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rent-add',
  templateUrl: './rent-add.component.html',
  styleUrls: ['./rent-add.component.css'],
})
export class RentAddComponent implements OnInit {
  isrentable: boolean;
  rentAddForm: FormGroup;
  carId: number;
  money: number;
  dailyPrice: number;
  route: ActivatedRouteSnapshot;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private rentService: RentalService,
    private toastrService: ToastrService,
    private cardetailService: CarDetailService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.carId = +params['carId'];
    });
    this.createRentAddForm();
    let customerId: any = localStorage.getItem('customerId');
    customerId = +JSON.parse(customerId); //customerId ve carId number türünden alınıyor artık.
  }
  createRentAddForm() {
    this.rentAddForm = this.formBuilder.group({
      customerId: ['', Validators.required],
      rentDate: ['', Validators.required],
      returnDate: ['', Validators.required],
    });
  }
  isRentable() {
    if (this.rentAddForm.valid) {
      let rentModel = Object.assign(
        { carId: this.carId },
        this.rentAddForm.value
      );
      localStorage.setItem('rentModel', JSON.stringify(rentModel));
      this.rentService.isRentable(this.carId, rentModel.rentDate).subscribe(
        (response) => {
          this.router.navigate(['creditcard']);
        },
        (errorResponse) => {
          this.toastrService.error(errorResponse.error.Errors[0].message);
        }
      );
    } else {
      this.toastrService.error('Boşlukları doldurunuz');
    }
  }
}
