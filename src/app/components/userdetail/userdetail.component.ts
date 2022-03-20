import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { UserDetails } from 'src/app/models/userDetails';
import { UserForUpdate } from 'src/app/models/userforupdate';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css'],
})
export class UserdetailComponent implements OnInit {
  userDetailForm: FormGroup;
  userdetails: UserForUpdate;
  passwordUpdateForm: FormGroup;
  user: UserDetails;
  customerId: any;
  password: string;
  firstName: any;
  lastName: any;
  oldpassword: string;
  constructor(
    private formBuild: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    let user: any = localStorage.getItem('user');
    user = JSON.parse(user);
    this.createUserDetailForm();
  }
  createUserDetailForm() {
    this.userDetailForm = this.formBuild.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, Validators.required],
    });
  }
  createPasswordForm() {
    this.passwordUpdateForm = this.formBuild.group({
      password: ['', Validators.required],
      oldPassword: ['', Validators.required],
    });
  }
  updatePassword() {
    let form = Object.assign({}, this.passwordUpdateForm.value);
    this.password = form.password;
    this.oldpassword = form.oldPassword;
  }

  updateUser() {
    if (this.userDetailForm.valid) {
      let user: UserForUpdate = Object.assign({}, this.userDetailForm.value);
      this.userService.update(user, this.customerId).subscribe((response) => {
        this.toastrService.info('Bilgileriniz güncellendi');
      });
    } else {
      this.toastrService.error('Boşluk bırakmayınız', 'UYARI!');
    }
  }
}
