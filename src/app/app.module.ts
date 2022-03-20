import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarComponent } from './components/car/car.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';

import { ToastrModule } from 'ngx-toastr';
import { ColorFilterPipePipe } from './pipes/color-filter-pipe.pipe';
import { BrandFilterPipePipe } from './pipes/brand-filter-pipe.pipe';
import { CarFilterPipePipe } from './pipes/carFilter-pipe.pipe';
import { RentAddComponent } from './components/rent-add/rent-add.component';
import { RentComponent } from './components/rent/rent.component';
import { CreditcardComponent } from './components/creditcard/creditcard.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CarAddComponent } from './components/car-add/car-add.component';
import { RegisterComponent } from './components/register/register.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import { UserdetailComponent } from './components/userdetail/userdetail.component';
import { MaterialModule } from './material/material.module';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import {
  MatFormFieldModule,
  MatPrefix,
  MatSuffix,
} from '@angular/material/form-field';
import { UsercarsComponent } from './components/usercars/usercars.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    NaviComponent,
    CarComponent,
    CartSummaryComponent,
    CarFilterPipePipe,
    ColorFilterPipePipe,
    BrandFilterPipePipe,
    RentAddComponent,
    RentComponent,
    CreditcardComponent,
    AuthComponent,
    CarAddComponent,
    RegisterComponent,
    UserdetailComponent,
    CarDetailsComponent,
    UsercarsComponent,
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
