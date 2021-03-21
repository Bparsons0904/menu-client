import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { MessagingService } from './messaging.service';

import * as query from '../models/Queries';
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userIsAuthenticated: BehaviorSubject<boolean>;
  private user: BehaviorSubject<User>;
  private registeredUsers: BehaviorSubject<User[]>;
  private rememberUser: boolean;
  private adminToken: string;

  constructor(
    private apollo: Apollo,
    private router: Router,
    private messagingService: MessagingService
  ) {
    // Initialize the observable variables with default values
    this.userIsAuthenticated = new BehaviorSubject<boolean>(false);
    this.user = new BehaviorSubject<User>(null);
    this.registeredUsers = new BehaviorSubject<User[]>([]);
    // TODO: Remove once real server is up
    this.messagingService.setLoadingBig(true);
    this.adminToken = environment.admin;

    this.apollo
      .watchQuery<any>({
        query: query.getUsers,
        context: {
          headers: new HttpHeaders().set('x-token', this.adminToken),
        },
      })
      .valueChanges.subscribe(({ data, loading, error }) => {
        if (data?.getUsers && !error) {
          this.registeredUsers.next(data.getUsers);
          this.messagingService.setLoadingBig(false);
        }
      });
    // Query the current user if token is saved
    const token: string = authHelpers.getUserToken();
    if (token) {
      this.getMe(token);
    }
  }

  /**
   * Query for getting current user
   *
   * @param token Token to login user
   */
  private getMe(token: string): void {
    // Custom type for returned data
    type data = {
      getMe: User;
    };
    this.apollo
      .watchQuery<data>({
        query: query.getMe,
        context: {
          headers: new HttpHeaders().set('x-token', token),
        },
      })
      .valueChanges.subscribe(({ data, loading, error }) => {
        // this.messagingService.setLoadingBig(loading);

        if (data?.getMe && !error) {
          this.setUser(null);
          this.userIsAuthenticated.next(true);
        }
      });
  }

  /**
   * Get all data fields for the current user.
   * @returns Current user
   */
  public getUser(): Observable<User> {
    return this.user;
  }

  /**
   * Update the value of the user Observable
   * @param user User object
   */
  public setUser(user: User): void {
    console.log('Set user', user);

    this.user.next(user);
    const authenticated: boolean = user !== null ? true : false;
    this.userIsAuthenticated.next(authenticated);
    this.messagingService.setLoadingSmall(false);
  }

  /**
   * Get all registered users emails and usernames
   * @returns All registered users emails and usernames
   */
  public getRegisteredUsers(): Observable<User[]> {
    if (this.registeredUsers.getValue().length === 0) {
      this.setRegisteredUsers();
    }
    return this.registeredUsers;
  }

  /**
   * Gets all registered users email and username to compare for new users
   */
  private setRegisteredUsers(): void {
    // Custom type for returned data
    type data = {
      getUsers: User[];
    };
    // Start query
    this.apollo
      .watchQuery<data>({
        query: query.getUsers,
        context: {
          headers: new HttpHeaders().set('x-token', this.adminToken),
        },
      })
      .valueChanges.subscribe(({ data }) => {
        if (data?.getUsers) {
          this.registeredUsers.next(data.getUsers);
        }
      });
  }

  /**
   * Return an observable to watch if user is authenticated
   * @returns Authenticated status
   */
  public isAuthenticated(): Observable<boolean> {
    return this.userIsAuthenticated.asObservable();
  }

  /**
   * Login user using graphql mutation
   *
   * @param login User selected username or email
   * @param password User inputted password
   */
  public loginUser(login: string, password: string, remember: boolean): void {
    // Store remember to check after load
    this.rememberUser = remember;
    // Start loading service
    this.messagingService.setLoadingSmall(true);

    // Custom type for returned data
    type data = {
      loginUser: {
        token: string;
        user: User;
      };
    };
    // Start mutation query
    this.apollo
      .mutate<data>({
        mutation: query.loginUser,
        context: {
          headers: new HttpHeaders().set('x-token', environment.admin),
        },
        variables: {
          username: login,
          password: password,
        },
      })
      .subscribe(
        ({ data }) => {
          // Store token if remember selected
          if (this.rememberUser) {
            const token = data?.loginUser?.token;
            authHelpers.setUserToken(token);
          }
          // Set user and authentication
          this.setUser(data?.loginUser?.user);
          // Route depending on profile status
          if (data?.loginUser?.user?.profile === null) {
            this.router.navigate(['/profile']);
          } else {
            this.router.navigate(['/menu']);
          }
        },
        (error) => {
          // Stop loading and display error message
          this.messagingService.setLoadingSmall(false);
          this.messagingService.setErrorMessage(error.message);
          console.log(
            '%cThere was an error sending the login query',
            'background: #222; color: #bada55',
            error.message
          );
        }
      );
  }

  /**
   * Submit user for registration
   *
   * @param login User selected username or email
   * @param password User inputted password
   */
  public registerUser(user: User, remember: boolean): void {
    // Set loading to true
    this.messagingService.setLoadingSmall(true);
    // Store temp values
    this.rememberUser = remember;

    // Custom return data type
    type data = {
      createUser: {
        token: string;
        user: User;
      };
    };

    // Start mutation
    this.apollo
      .mutate<data>({
        mutation: query.registerUser,
        context: {
          headers: new HttpHeaders().set('x-token', environment.admin),
        },
        variables: {
          ...user,
        },
      })
      .subscribe(
        ({ data }) => {
          // Set token to returned data value
          if (data.createUser) {
            authHelpers.setUserToken(data.createUser.token);
          }
          // Set user and authentication
          this.setUser(data.createUser.user);
          this.router.navigate(['/profile']);
        },
        (error) => {
          // Stop loading and display error message
          this.messagingService.setLoadingSmall(false);
          this.messagingService.setErrorMessage(error.message);
          console.log('there was an error sending the query', error.messages);
        }
      );
  }

  /**
   * Log user out of application
   *
   */
  public logout(): void {
    // Clear user information
    this.userIsAuthenticated.next(false);
    this.setUser(null);
    authHelpers.clearUserToken();
    // Return to home page
    this.router.navigate(['/']);
  }
}

export class authHelpers {
  /**
   * Get user token stored in local storage
   * @returns Stored value of user token
   */
  static getUserToken(): string {
    console.log(localStorage.getItem('token'));

    return localStorage.getItem('token') ?? null;
  }

  /**
   * Store the users token to local storage
   * @param token User token from login/registration
   */
  static setUserToken(token: string): void {
    console.log(token);

    localStorage.setItem('token', token);
    console.log(localStorage.getItem('token'));
  }

  /**
   * Remove the users token from local storage
   */
  static clearUserToken(): void {
    localStorage.removeItem('token');
  }
}
/**
 * This is the 1st type of query, use when a observable is not needed/desired
 */

// this.checkMe = this.apollo.watchQuery({ query: getMe }).valueChanges.pipe(
//   map(({ data }) => {
//     console.log('me is working', data);

//     if (data === null || data['me'] === null) {
//       return false;
//     } else {
//       return data['me']['id'] > 0 ? true : false;
//     }
//   })
// );
