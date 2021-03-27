import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../../services/auth.services';

@Component({
  selector: 'app-resetrequest',
  templateUrl: './resetrequest.component.html',
  styleUrls: ['./resetrequest.component.scss'],
})
export class ResetrequestComponent implements OnInit {
  faEnvelope = faEnvelope;
  faLock = faLock;

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  resetForm = this.fb.group({
    email: ['deadstylebp@gmail.com', [Validators.required, Validators.email]],
  });

  ngOnInit(): void {}

  get email() {
    return this.resetForm.get('email');
  }

  public onSubmit(): void {
    this.authService.resetPassword(this.resetForm.value.email);
  }
}
