import { updateProfile, createProfile } from './../models/Queries';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { MessagingService } from './messaging.service';
import { AuthService, authHelpers } from './auth.services';
import { Profile } from '../models/profile';
import { User } from '../models/user';
import * as query from '../models/Queries';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private profile: BehaviorSubject<Profile>;
  constructor(
    private apollo: Apollo,
    private router: Router,
    private messagingService: MessagingService,
    private authService: AuthService
  ) {
    this.profile = new BehaviorSubject<Profile>(null);
  }

  public setProfile(profile: Profile): void {
    this.profile.next(profile);
    console.log(this.profile);
  }

  public createProfile(profile: Profile): void {
    this.messagingService.setLoadingSmall(true);
    type data = {
      createProfile: User;
    };

    this.apollo
      .mutate<data>({
        mutation: query.createProfile,
        context: {
          headers: new HttpHeaders().set('x-token', authHelpers.getUserToken()),
        },
        variables: {
          ...profile,
        },
      })
      .subscribe(
        ({ data }) => {
          console.log('Creating profile', data);

          if (data) {
            console.log('inside', data?.createProfile);

            this.authService.setUser(data?.createProfile);
          }
        },
        (error) => {
          // Stop loading
          this.messagingService.setLoadingSmall(false);
          console.log('there was an error sending the query', error.message);
        }
      );
  }

  public updateProfile(profile: Profile): void {
    console.log(profile.id);

    type data = {
      updateProfile: User;
    };
    this.apollo
      .mutate<data>({
        mutation: query.updateProfile,
        context: {
          headers: new HttpHeaders().set('x-token', authHelpers.getUserToken()),
        },
        variables: {
          ...profile,
        },
      })
      .subscribe(
        ({ data }) => {
          if (data) {
            this.authService.setUser(data.updateProfile);
            this.router.navigate(['/customer/home']);
          }
        },
        (error) => {
          // Stop loading
          this.messagingService.setLoadingSmall(false);
          console.log('there was an error sending the query', error.message);
        }
      );
  }
}
