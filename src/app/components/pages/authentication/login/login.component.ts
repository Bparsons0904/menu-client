import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.services';
import { FormBuilder, Validators } from '@angular/forms';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  faEnvelope = faEnvelope;
  faLock = faLock;

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {}

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    console.log('submitted');

    this.authService.loginUser(
      this.loginForm.value.username,
      this.loginForm.value.password
    );
  }
}
