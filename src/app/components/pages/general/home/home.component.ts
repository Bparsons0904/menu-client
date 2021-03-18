import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import {
  faThumbsUp,
  faAward,
  faChartLine,
  faBan,
} from '@fortawesome/free-solid-svg-icons';

// Services
import { AuthService } from '../../../../services/auth.services';

// Models
import { User } from '../../../../models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  faThumbsUp = faThumbsUp;
  faAward = faAward;
  faChartLine = faChartLine;
  faBan = faBan;

  public isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isAuthenticated().subscribe((user) => {
      this.isAuthenticated = user;
    });
  }
}
