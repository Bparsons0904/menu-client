import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((user) => {
      this.isAuthenticated = user;
    });
  }

  public logout(): void {
    this.authService.logout();
  }

  public toggleCheckbox(event): void {
    const elements: HTMLCollection = document.getElementsByClassName('active');
    Array.from(elements).forEach((element) => {
      element.classList.remove('active');
    });
    console.log(event.target);
    const checkbox: HTMLInputElement = <HTMLInputElement>(
      document.getElementById('toggler')
    );
    checkbox.checked = !checkbox.checked;
    const target: HTMLElement = document.getElementById(event.target.id);
    target.classList.add('active');
  }
}
