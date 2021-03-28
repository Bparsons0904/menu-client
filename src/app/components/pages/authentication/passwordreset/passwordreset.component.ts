import { AuthService } from '../../../../services/auth.service';
import { MessagingService } from './../../../../services/messaging.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import * as query from '../../../../models/Queries';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { CustomvalidationService } from '../../../../services/customvalidation.service';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.scss'],
})
export class PasswordresetComponent implements OnInit {
  public id: string;
  public email: string;
  public expired: boolean;
  public faLock = faLock;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private messagingService: MessagingService,
    private customValidator: CustomvalidationService,
    private apollo: Apollo,
    private fb: FormBuilder
  ) {
    this.route.params.subscribe((params) => {
      this.id = params.id;
    });
  }

  ngOnInit(): void {
    type data = {
      getResetToken: string;
    };
    this.apollo
      .watchQuery<data>({
        query: query.getResetToken,
        variables: { id: this.id },
      })
      .valueChanges.subscribe(
        ({ data }) => {
          if (data?.getResetToken) {
            this.email = data.getResetToken;
          }
          this.expired = false;
        },
        (error) => {
          this.messagingService.setErrorMessage(error.message);
          this.expired = true;
        }
      );
  }

  public changeForm: FormGroup = this.fb.group(
    {
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
      validator: this.customValidator.matchPassword(
        'password',
        'confirmPassword'
      ),
    }
  );

  get password() {
    return this.changeForm.get('password');
  }
  get confirmPassword() {
    return this.changeForm.get('confirmPassword');
  }
  get remember() {
    return this.changeForm.get('remember');
  }

  public onSubmit(): void {
    this.authService.changePassword(
      this.id,
      this.changeForm.value.password,
      true
    );
  }
}
