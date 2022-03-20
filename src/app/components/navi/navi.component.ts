import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { last } from 'rxjs';
import { UserDetails } from 'src/app/models/userDetails';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private helper: JwtHelperService,
    private toastrService: ToastrService,
    private userService: UserService
  ) {}
  myLogo: string = 'assets/images/Logo.jpg';
  userLogo: string = 'assets/images/userlogo.png';
  firstName: string;
  lastName: string;
  userMail: any;
  user: any;
  ngOnInit(): void {
    if (this.isAuthenticated()) {
    }
    this.user = localStorage.getItem('user');
    this.user = JSON.parse(this.user);
    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
  }
  isAuthenticated(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      return false;
    }
  }
  quit() {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenexpiration');
    localStorage.removeItem('user');
    localStorage.removeItem('customerId');
    this.toastrService.error('Çıkış yapıldı');
  }
}
