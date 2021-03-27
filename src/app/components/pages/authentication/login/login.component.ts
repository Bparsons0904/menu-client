import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../../services/auth.services';
import { MessagingService } from '../../../../services/messaging.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  faEnvelope = faEnvelope;
  faLock = faLock;

  loginForm = this.fb.group({
    username: ['deadstyle', [Validators.required]],
    password: ['!Mustangs95', [Validators.required, Validators.minLength(8)]],
    remember: [true],
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private messagingService: MessagingService
  ) {}

  ngOnInit(): void {}

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
  get remember() {
    return this.loginForm.get('remember');
  }

  onSubmit(): void {
    this.authService.loginUser(
      this.loginForm.value.username,
      this.loginForm.value.password,
      this.loginForm.value.remember
    );
  }
}
