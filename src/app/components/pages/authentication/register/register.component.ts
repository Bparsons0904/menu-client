import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl,
  ValidatorFn,
  FormGroup,
} from '@angular/forms';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';

// Services
import { AuthService } from '../../../../services/auth.service';
import { MessagingService } from '../../../../services/messaging.service';
import { CustomvalidationService } from '../../../../services/customvalidation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  faEnvelope = faEnvelope;
  faLock = faLock;
  faUser = faUser;

  private registeredUsernames: string[] = [];
  private registeredEmails: string[] = [];

  private usernameUnique: ValidatorFn = (control: FormControl) => {
    if (control.dirty && this.registeredUsernames !== null) {
      const usernameExist = this.registeredUsernames.includes(
        control.value.toLowerCase()
      );
      return usernameExist
        ? { usernameUnique: { value: control.value } }
        : null;
    }
    return null;
  };
  private emailUnique: ValidatorFn = (control: FormControl) => {
    if (control.dirty && this.registeredEmails !== null) {
      const emailExist = this.registeredEmails.includes(control.value);
      return emailExist ? { emailUnique: { value: control.value } } : null;
    }
    return null;
  };

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private customValidator: CustomvalidationService
  ) {}

  public registerForm: FormGroup = this.fb.group(
    {
      username: ['asdfasdf', [Validators.required, this.usernameUnique]],
      email: [
        'asfasfd@gmail.com',
        [Validators.required, Validators.email, this.emailUnique],
      ],
      password: [
        '!Mustangs95',
        [Validators.required, this.customValidator.patternValidator()],
      ],
      confirmPassword: [
        '!Mustangs95',
        [Validators.required, Validators.minLength(8)],
      ],
      remember: [true],
    },
    {
      validators: this.customValidator.matchPassword(
        'password',
        'confirmPassword'
      ),
    }
  );

  ngOnInit(): void {
    this.authService.getRegisteredUsers().subscribe((registeredUsers) => {
      if (registeredUsers) {
        registeredUsers.forEach((user) => {
          this.registeredUsernames.push(user.username.toLowerCase());
          this.registeredEmails.push(user.email.toLowerCase());
        });
      }
    });
  }

  get username() {
    return this.registerForm.get('username');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
  get remember() {
    return this.registerForm.get('remember');
  }

  onSubmit(): void {
    this.authService.registerUser(
      this.registerForm.value,
      this.registerForm.value.rememberUser
    );
  }
}
