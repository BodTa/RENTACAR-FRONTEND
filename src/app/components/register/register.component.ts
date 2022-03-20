import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { isover2 } from 'src/app/animations/animations';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [isover2],
})
export class RegisterComponent implements OnInit {
  a: boolean;
  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private authSerive: AuthService
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
  }
  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  register() {
    if (this.registerForm.valid) {
      let registerModel = Object.assign({}, this.registerForm.value);
      this.authSerive.register(registerModel).subscribe(
        (response) => {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('tokenexpiration', response.data.expiration);
          this.router.navigate(['/login']);
          this.toastr.success('Kayıt başarılı');
        },
        (errorResponse) => {
          this.toastr.error(errorResponse.error.message);
        }
      );
    } else {
      this.toastr.warning('Lütfen formu doldurunuz', 'UYARI!');
    }
  }
  isOver(a: boolean) {
    this.a = a;
  }
  ifOver(): boolean {
    return this.a;
  }
}
