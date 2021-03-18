import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
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
    // Observer user authentication status
    this.authService.isAuthenticated().subscribe((user) => {
      this.isAuthenticated = user;
    });
  }

  /**
   * Logout user
   */
  public logout(event): void {
    this.toggleCheckbox(event);
    this.authService.logout();
  }

  /**
   * Updated active menu link
   *
   * @param event Menu li clicked
   */
  public toggleCheckbox(event): void {
    const elements: HTMLCollection = document.getElementsByClassName('active');
    Array.from(elements).forEach((element) => {
      element.classList.remove('active');
    });
    const checkbox: HTMLInputElement = <HTMLInputElement>(
      document.getElementById('toggler')
    );
    checkbox.checked = !checkbox.checked;
    const target: HTMLElement = document.getElementById(event.target.id);
    if (target) {
      target.classList.add('active');
    }
  }
}
