import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validator,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { isover2 } from 'src/app/animations/animations';

import { UserDetails } from 'src/app/models/userDetails';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  animations: [isover2],
})
export class AuthComponent implements OnInit {
  a: boolean;
  a2: boolean;
  hide = true;
  userDetail: UserDetails;
  authForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private helper: JwtHelperService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.createAuthForm();
  }
  createAuthForm() {
    this.authForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  login() {
    if (this.authForm.valid) {
      let loginModel = Object.assign({}, this.authForm.value);
      this.authService.login(loginModel).subscribe(
        (response) => {
          this.toastrService.success('Giriş başarılı');
          localStorage.setItem('token', JSON.stringify(response.data.token));
          const token: any = localStorage.getItem('token');
          const decodedToken = this.helper.decodeToken(token);
          const userId: number =
            decodedToken[
              'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
            ];
          localStorage.setItem('customerId', JSON.stringify(userId));
          const userMail: string = decodedToken['email'];
          this.userService.getUserByEmail(userMail).subscribe((response) => {
            localStorage.setItem('user', JSON.stringify(response.data));
          });

          this.router.navigate(['']);
        },
        (errorResponse) => {
          this.toastrService.error(errorResponse.error);
        }
      );
    } else {
      this.toastrService.error('Tüm seçenekleri doldurunuz');
    }
  }
  isOver(a: boolean) {
    this.a = a;
  }
  ifOver(): boolean {
    return this.a;
  }
  isOver2(a: boolean) {
    this.a2 = a;
  }
  ifOver2(): boolean {
    return this.a2;
  }
}
