import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.services';
import { Form, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    console.log('submitted');

    this.authService.loginUser(
      this.loginForm.value.username,
      this.loginForm.value.password
    );
  }
}
