import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarAdd } from 'src/app/models/carAdd';
import { Color } from 'src/app/models/color';
import { Image } from 'src/app/models/image';
import { ImageForAdd } from 'src/app/models/imageForAdd';
import { BrandService } from 'src/app/services/brand.service';
import { CarDetailService } from 'src/app/services/cardetail.service';
import { ColorService } from 'src/app/services/color.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
  user: any;
  carAddForm: FormGroup;
  selectedFiles: any[];
  image: Image[];
  colors: Color[] = [];
  brands: Brand[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarDetailService,
    private toastrService: ToastrService,
    private colorService: ColorService,
    private brandService: BrandService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.user = JSON.parse(this.user);
    this.getBrands();
    this.getColors();
    this.createCarAddForm();
  }
  urls = [];
  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandid: ['', Validators.required],
      colorid: ['', Validators.required],
      carName: ['', Validators.required],
      doorCount: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  onselect(e: any) {
    if (e.target.files) {
      this.selectedFiles = e.target.files;
    }
  }
  add() {
    if (this.carAddForm.valid) {
      let carForm = Object.assign({}, this.carAddForm.value);
      let carAddModel: CarAdd = {
        brandId: carForm.brandid,
        colorId: carForm.colorid,
        carName: carForm.carName,
        modelYear: carForm.modelYear,
        dailyPrice: carForm.dailyPrice,
        doorCount: carForm.doorCount,
        sellerId: this.user.userId,
        description: carForm.description,
      };
      this.carService.addCar(carAddModel).subscribe(
        (response) => {
          this.carService
            .getCarBySellerId(this.user.userId)
            .subscribe((response) => {
              //@ts-nocheck
              //@ts-ignore
              this.addImage(this.selectedFiles, response.carId);
              this.toastrService.success('Araç başarıyla satışa çıkarılmıştır');
            });
        },
        (responseError) => {
          this.toastrService.error(responseError.error.Message);
        }
      );
    } else {
      this.toastrService.error('Formu doldurunuz', 'UYARI');
    }
  }
  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  addImage(selectedFiles: File[], carId: any) {
    for (let i = 0; i < this.selectedFiles.length; i++) {
      const formData: FormData = new FormData();
      formData.append('image', selectedFiles[i], selectedFiles[i].name);
      formData.append('carId', <string>carId);
      this.imageService.addImages(formData).subscribe((response) => {});
    }
  }
}
