import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-registered',
  templateUrl: './registered.component.html',
  styleUrls: ['./registered.component.scss'],
})
export class RegisteredComponent implements OnInit {
  private id: string;
  private remember: boolean;

  constructor(private route: ActivatedRoute, private authService: AuthService) {
    this.route.params.subscribe((params) => {
      this.id = params.id;
      this.remember = params.remember;
    });
  }

  ngOnInit(): void {
    if (this.id) {
      this.authService.completeRegistration(this.id, this.remember);
    }
  }
}
