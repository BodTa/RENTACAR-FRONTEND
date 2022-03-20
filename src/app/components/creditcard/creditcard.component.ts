import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CreditCart } from 'src/app/models/creditcard';
import { Rental } from 'src/app/models/rental';
import { CarDetailService } from 'src/app/services/cardetail.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';
import { RentAddComponent } from '../rent-add/rent-add.component';

@Component({
  selector: 'app-creditcard',
  templateUrl: './creditcard.component.html',
  styleUrls: ['./creditcard.component.css']
})
export class CreditcardComponent implements OnInit {
  creditCardForm:FormGroup;
  customerId:number;
  carId:number;
  constructor(private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute,
    private carService:CarDetailService,
    private rentalService:RentalService) { }

  ngOnInit(): void {
     this.createCreditCardForm();
  }

  createCreditCardForm(){
    this.creditCardForm=this.formBuilder.group({
      cardOwnerName:["",Validators.required],
      creditCardNumber:["",Validators.required],
      CCV:["",Validators.required],
      expirationDate:["",Validators.required],
    })
  }
  payCost(){
    if(this.creditCardForm.valid){
    let rentModel:any = localStorage.getItem("rentModel");
    rentModel= JSON.parse(rentModel);
      this.rentalService.rentCar(rentModel).subscribe(response=>{
        this.toastrService.success("Ödeme işlemi tamamlanmıştır.");
      },errorResponse=>{
         for(let a =0;a<errorResponse.error.Errors.length;a++){
           this.toastrService.error(errorResponse.error.Errors[a].ErrorMessage);
         }
      })
      
    }
    else{
      this.toastrService.error("Lütfen boşlukları doldurunuz","UYARI!")
    }
  }
}
