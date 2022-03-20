import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CarComponent } from './components/car/car.component';
import { ColorComponent } from './components/color/color.component';
import { CreditcardComponent } from './components/creditcard/creditcard.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RegisterComponent } from './components/register/register.component';
import { RentAddComponent } from './components/rent-add/rent-add.component';
import { RentComponent } from './components/rent/rent.component';
import { UsercarsComponent } from './components/usercars/usercars.component';
import { UserdetailComponent } from './components/userdetail/userdetail.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarComponent },
  { path: 'cars', component: CarComponent },
  { path: 'brands', component: BrandComponent },
  { path: 'colors', component: ColorComponent },
  { path: 'customers', component: CustomerComponent },
  { path: 'cars/brand/:brandId', component: CarComponent },
  { path: 'cars/color/:colorId', component: CarComponent },
  { path: 'cars/seller/:sellerId', component: CarComponent },
  {
    path: 'rental/add/:carId',
    component: RentAddComponent,
    canActivate: [LoginGuard],
  },
  { path: 'rents', component: RentComponent },
  { path: 'creditcard', component: CreditcardComponent },
  { path: 'login', component: AuthComponent },
  { path: 'car/add', component: CarAddComponent, canActivate: [LoginGuard] },
  { path: 'register', component: RegisterComponent },
  {
    path: 'userdetail',
    component: UserdetailComponent,
    canActivate: [LoginGuard],
  },
  { path: 'cardetails/:carId', component: CarDetailsComponent },
  { path: 'mycars', component: UsercarsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
