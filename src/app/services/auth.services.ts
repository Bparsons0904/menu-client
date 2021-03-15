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
 * Query for getting current user
 */
const getUsers = gql`
  {
    getUsers {
      username
      email
    }
  }
`;
/**
 * Mutation for registering user
 */
const registerUser = gql`
  mutation registerUser(
    $username: String!
    $password: String!
    $email: String!
  ) {
    registerUser(username: $username, email: $email, password: $password) {
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
  private registeredUsers: BehaviorSubject<User[]>;
  private rememberUser: boolean;

  constructor(
    private apollo: Apollo,
    private router: Router,
    private messagingService: MessagingService
  ) {
    // Initialize the observable variables with default values
    this.userIsAuthenticated = new BehaviorSubject<boolean>(false);
    this.user = new BehaviorSubject<User>(null);
    this.registeredUsers = new BehaviorSubject<User[]>([]);

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
          console.log('Inside');

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

  public getRegisteredUsers(): Observable<User[]> {
    console.log(this.registeredUsers.getValue());

    if (this.registeredUsers.getValue().length === 0) {
      this.setRegisteredUsers();
      console.log('Get users started');
    }
    return this.registeredUsers;
  }

  private setRegisteredUsers(): void {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYzBmNDUxLWNjYzYtNDJmMC1iODMwLTc4MmFmOTU2Yzg3MCIsImVtYWlsIjoiYWRtaW5AbWVudS5jb20iLCJ1c2VybmFtZSI6IkFkbWluIiwiaWF0IjoxNjE1NzM2NDI1LCJleHAiOjE2MTgzMjg0MjV9.5X6n4I-FFUsVXHx_Qn4Vj3fYnrP9G4n8abcA2ZlrPBI';
    this.apollo
      .watchQuery<any>({
        query: gql`
          {
            getUsers {
              username
              email
            }
          }
        `,
        context: {
          headers: new HttpHeaders().set('x-token', token),
        },
      })
      .valueChanges.subscribe(({ data, loading, error }) => {
        if (data?.getUsers && !error) {
          this.registeredUsers.next(data.getUsers);
        }
      });
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
    console.log(user);
    if (remember) {
      this.rememberUser = true;
    }

    this.apollo
      .mutate<any>({
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
          if (this.registerUser) {
            this.setToken(data.registerUser.token);
            console.log('saving token');
          }
          this.messagingService.setLoadingSmall(false);
          this.router.navigate(['/profile']);
          // Store token to local storage
          // localStorage.setItem('jobkikToken', token);
          // Set authentication to true
          // this.userIsAuthenticated.next(true);
          // Stop loading animation

          // Return to home page
          // this.router.navigate(['/']).then(() => location.reload());
        },
        (error) => {
          // Stop loading

          console.log('there was an error sending the query', error);
        }
      );
  }

  private setToken(token: string): void {
    localStorage.setItem('token', token);
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
