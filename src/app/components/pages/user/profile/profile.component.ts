import { Component, OnInit } from '@angular/core';
import { Profile } from '../../../../models/Profile';
import { User } from '../../../../models/User';
import {
  FormBuilder,
  Validators,
  FormControl,
  ValidatorFn,
  FormGroup,
} from '@angular/forms';
import {
  faEnvelope,
  faLock,
  faUser,
  faSignature,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
// Services
import { AuthService } from '../../../../services/auth.service';
import { ProfileService } from '../../../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  faEnvelope = faEnvelope;
  faLock = faLock;
  faUser = faUser;
  faSignature = faSignature;
  faPhone = faPhone;

  public user: User;
  private profile: Profile;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      console.log('From profile: ', user);

      if (user) {
        this.user = user;
      }
      if (user?.profile?.id) {
        this.profile = user.profile;
        console.log('Profile ID: ', this.profile.id);

        this.profileForm.patchValue({
          email: this.profile.email,
          firstName: this.profile.firstName,
          lastName: this.profile.lastName,
          phone: this.profile.phone,
          title: this.profile.title,
          id: this.profile.id,
        });
      }
    });
  }

  public profileForm: FormGroup = this.fb.group({
    firstName: ['John', Validators.required],
    lastName: ['Doe', Validators.required],
    title: ['Finance Manager', Validators.required],
    phone: [8168888888, [Validators.required]],
    email: ['admin@menu.com', [Validators.required, Validators.email]],
    id: [''],
  });

  get firstName() {
    return this.profileForm.get('firstName');
  }
  get email() {
    return this.profileForm.get('email');
  }
  get lastName() {
    return this.profileForm.get('lastName');
  }
  get title() {
    return this.profileForm.get('title');
  }
  get phone() {
    return this.profileForm.get('phone');
  }

  onSubmit(): void {
    console.log(this.profile);

    // Determine if updating the user profile or creating
    if (this.profile) {
      this.profileService.updateProfile(this.profileForm.getRawValue());
    } else {
      this.profileService.createProfile(this.profileForm.getRawValue());
    }
  }

  public useLoginEmail(): void {
    this.profileForm.patchValue({
      email: this.user.email,
    });
  }
}
