import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.services';
import {
  FormBuilder,
  Validators,
  FormControl,
  ValidatorFn,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  private usernameUnique: ValidatorFn = (control: FormControl) => {
    console.log('validate');
    if (control.dirty) {
      console.log('dirty');
    }
    console.log(control);

    if (control.touched) {
      console.log('toched');
    }

    return null;
  };

  registerForm = this.fb.group({
    username: ['deadstyle', [Validators.required, this.usernameUnique]],
    email: ['deadstyle@gmail.com', [Validators.required, Validators.email]],
    password: ['!Mustangs95', [Validators.required, Validators.minLength(8)]],
    // verifyPassword: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {}

  get username() {
    return this.registerForm.get('username');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }

  onSubmit(): void {
    console.log('submitted');
  }
}
