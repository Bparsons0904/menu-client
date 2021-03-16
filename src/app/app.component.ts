import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.services';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'menu-client';
  faCoffee = faCoffee;
  
  constructor(private authService: AuthService) {}

  ngOnInit() {}
}
