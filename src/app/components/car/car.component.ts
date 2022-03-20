import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetailService } from 'src/app/services/cardetail.service';
import { ColorService } from 'src/app/services/color.service';
import { BrandService } from 'src/app/services/brand.service';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CarDetails } from 'src/app/models/carDetails';
import { Image } from 'src/app/models/image';
import { ImageService } from 'src/app/services/image.service';
import { faLiraSign, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { UserDetails } from 'src/app/models/userDetails';
import { UserService } from 'src/app/services/user.service';
import { fade, isover } from 'src/app/animations/animations';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
  animations: [fade, isover],
})
export class CarComponent implements OnInit {
  isOver = false;
  isOver2 = false;
  isOver3 = false;
  a: boolean;
  a1: boolean;
  a2: boolean;
  currentCard: any;
  cars: Car[];
  carSeller: UserDetails;
  carDetails: CarDetails[];
  carImage: Image[];
  brands: Brand[];
  colors: Color[];
  car: Car;
  imageUrl = 'https://localhost:44362';
  dataLoaded = false;
  filterText = '';
  carId: number;
  selectedBrandId: number = 0;
  selectedColorId: number = 0;
  constructor(
    private carService: CarDetailService,
    private activetedRoute: ActivatedRoute,
    private brandService: BrandService,
    private colorsService: ColorService,
    private cartService: CartService,
    private toastrService: ToastrService,
    private ımageService: ImageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.activetedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      } else if (params['sellerId']) {
        this.getCarsBySellerId(+params['sellerId']);
      } else {
        this.getCarDetails();
      }
    });
    this.getBrands();
    this.getColors();
  }
  getCarDetails() {
    this.carService.getCarDetails().subscribe((respone) => {
      this.carDetails = respone.data;
      this.dataLoaded = true;
    });
  }
  getSellerDetails(sellerId: number) {
    this.userService.getUserById(sellerId).subscribe((respone) => {
      this.carSeller = respone.data;
    });
  }
  getImagesByCarId(carId: any) {
    this.ımageService.getImagesByCarId(carId).subscribe((response) => {
      this.carImage = response.data;
      this.getImagePath(this.carImage[0].imagePath);
    });
  }
  getImagePath(image: string) {
    return this.imageUrl + image;
  }
  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }
  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  getColors() {
    this.colorsService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  getCarsByBrandandColor() {
    if (this.selectedBrandId == 0 && this.selectedColorId == 0) {
      this.getCarDetails();
    } else if (this.selectedBrandId == 0 && this.selectedColorId != 0) {
      this.getCarsByColor(this.selectedColorId);
    } else if (this.selectedColorId == 0 && this.selectedBrandId != 0) {
      this.getCarsByBrand(this.selectedBrandId);
    } else {
      this.carService
        .getCarsByBrandandColor(this.selectedColorId, this.selectedBrandId)
        .subscribe((response) => {
          this.carDetails = response.data;
        });
    }
    this.toastrService.success('Listeleme başarıyla gerçekleşti.');
  }
  addToCart(carId: number) {
    this.carService.getCarById(carId).subscribe((response) => {
      this.car = response.data;
    });
    this.cartService.addToCart(this.car);
    this.toastrService.success('Sepete eklendi');
  }
  setCar(car: CarDetails) {
    this.carDetails = [];
    this.carDetails.push(car);
  }
  rentCar() {
    this.toastrService.success('Araç kiralandı');
  }
  getCarsBySellerId(sellerId: number) {
    this.carService.getCarsBySellerId(sellerId).subscribe((res) => {
      this.cars = res.data;
    });
  }
  // These setButtons&SetCurrentCard for button animation.
  setButton(i: any): boolean {
    if (i == this.currentCard) {
      return this.a;
    }
    return false;
  }
  setCurrentCard(i: any, a: boolean) {
    this.currentCard = i;
    this.a = a;
  }
  setButton2(i: any): boolean {
    if (i == this.currentCard) {
      return this.a1;
    }
    return false;
  }
  setCurrentCard2(i: any, a: boolean) {
    this.currentCard = i;
    this.a1 = a;
  }
  setButton3(i: any): boolean {
    if (i == this.currentCard) {
      return this.a2;
    }
    return false;
  }
  setCurrentCard3(i: any, a: boolean) {
    this.currentCard = i;
    this.a2 = a;
  }
}
