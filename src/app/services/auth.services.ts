import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { User } from '../models/user';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { MessagingService } from './messaging.service';

/**
 * Query for getting current user
 */
const getMe = gql`
  {
    me {
      id
      username
      email
      profile {
        firstName
        lastName
        role
      }
    }
  }
`;
/**
 * Mutation for registering user
 */
const registerUser = gql`
  mutation registerUser(
    $firstName: String!
    $lastName: String!
    $username: String!
    $password: String!
    $email: String!
    $phoneNumber: String
    $role: String!
  ) {
    registerUser(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
      phoneNumber: $phoneNumber
      role: $role
    ) {
      user {
        id
      }
      token
    }
  }
`;
/**
 * Mutation for getting current user
 */
const loginUser = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(login: $username, password: $password) {
      token
      user {
        id
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userIsAuthenticated: BehaviorSubject<boolean>;
  private user: BehaviorSubject<User>;

  constructor(
    private apollo: Apollo,
    private router: Router,
    private messagingService: MessagingService
  ) {
    // Initialize the observable variables with default values
    this.userIsAuthenticated = new BehaviorSubject<boolean>(false);
    this.user = new BehaviorSubject<User>(null);

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

    // Query the current user to see if they are authenticated. If true, set
    // Authenticated to true and stop loading

    const token: string = this.getUserToken();
    if (token) {
    }
  }

  private getMe(token: string): void {
    this.apollo
      .watchQuery<any>({
        query: getMe,
        context: {
          headers: new HttpHeaders().set('x-token', token),
        },
      })
      .valueChanges.subscribe(({ data, loading, error }) => {
        this.messagingService.setLoadingBig(loading);
        console.log(error, data);

        if (data?.me && !error) {
          console.log('Isnide');

          this.user.next(data.me);
          this.userIsAuthenticated.next(true);
        }
      });
  }

  private getUserToken(): string {
    return localStorage.getItem('token') ?? null;
  }

  private setUserToken(token: string): void {
    localStorage.setItem('token', token);
  }

  private clearUserToken(): void {
    localStorage.removeItem('token');
  }

  public getUser(): Observable<User> {
    return this.user;
  }
  /**
   * Return an observable to watch if user is authenticated
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
  public loginUser(login: string, password: string): void {
    console.log('Loging iN');

    // Set loading to true
    // Start mutation query
    this.apollo
      .mutate({
        mutation: loginUser,
        variables: {
          username: login,
          password: password,
        },
      })
      .subscribe(
        ({ data }) => {
          console.log(data);

          // Add data to user using deconstructor
          this.user = { ...data['loginUser']['user'] };
          // Set token to returned data value
          const token = data['loginUser']['token'];
          console.log({ token });

          // Store token to local storage
          // localStorage.setItem('jobkikToken', token);
          // location.reload();
          // Stop loading
          // this.loading.next(false);
          // Set authentication to true
          // this.userIsAuthenticated.next(true);
          // if (this.user.completedProfile) {
          //   // Return to home page
          //   this.router.navigate(['/']).then(() => location.reload());
          // } else if (this.user.role === 'employer') {
          //   this.router.navigate(['/employers']).then(() => location.reload());
          // } else {
          //   // Send to createprofile
          //   this.router
          //     .navigate(['/createprofile'])
          //     .then(() => location.reload());
          // }
        },
        (error) => {
          // Stop loading

          console.log('there was an error sending the login query', error);
        }
      );
  }

  /**
   * Submit user for registration
   *
   * @param login User selected username or email
   * @param password User inputted password
   */
  public registerUser(user: User): void {
    // Set loading to true
    this.apollo
      .mutate({
        mutation: registerUser,
        variables: {
          username: user.username,
          password: user.password,
          email: user.email,
          //   firstName: user.firstName,
          //   lastName: user.lastName,
          //   phoneNumber: user.phoneNumber,
          //   role: user.role,
        },
      })
      .subscribe(
        ({ data }) => {
          // Set token to returned data value
          const token = data['registerUser']['token'];
          // Store token to local storage
          localStorage.setItem('jobkikToken', token);
          // Set authentication to true
          this.userIsAuthenticated.next(true);
          // Stop loading animation

          // Return to home page
          this.router.navigate(['/']).then(() => location.reload());
        },
        (error) => {
          // Stop loading

          console.log('there was an error sending the query', error);
        }
      );
  }

  /**
   * Log user out of application
   *
   */
  public logout(): void {
    // Set authentication to false
    this.userIsAuthenticated.next(false);
    // Clear user information from the application
    // this.userService.clearUser();
    // Remove token from storage
    localStorage.setItem('jobkikToken', null);
    // Return to home page
    this.router.navigate(['/']).then(() => location.reload());
  }
}
