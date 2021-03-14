import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

// Services
import { AuthService } from '../../../services/auth.services';

// Models
import { User } from '../../../models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title = 'menu-client';
  users: User[];
  loading = true;
  error: any;
  user: User;

  constructor(private apollo: Apollo, private authService: AuthService) {}

  ngOnInit() {
    // this.authService.getMe().subscribe((user) => {
    //   this.user = user;
    // });
    //   this.apollo
    //     .watchQuery({
    //       query: gql`
    //         {
    //           getUsers {
    //             id
    //             username
    //             email
    //             profile {
    //               firstName
    //               lastName
    //               userId
    //               role
    //             }
    //           }
    //         }
    //       `,
    //       context: {
    //         headers: new HttpHeaders().set(
    //           'x-token',
    //           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVmOGQ0YzFhLWRkMWUtNGIyNC04YmI0LTFmMjljNzRjYWI0OSIsImVtYWlsIjoidXNlckBtZW51LmNvbSIsInVzZXJuYW1lIjoiVXNlciIsImlhdCI6MTYxNTY4MTg2MiwiZXhwIjoxNjE4MjczODYyfQ.K4lI4iOjn4x5ap8vJWPOT56SzWQCCSfukuTFbxYKJ_g'
    //         ),
    //       },
    //     })
    //     .valueChanges.subscribe((result: any) => {
    //       this.users = result?.data?.getUsers;
    //       console.log(result?.data?.getUsers);
    //       console.log(this.users[0]?.id);
    //       this.loading = result.loading;
    //       this.error = result.error;
    //     });
  }
}
