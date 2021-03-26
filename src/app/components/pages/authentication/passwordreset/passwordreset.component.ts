import { AuthService } from './../../../../services/auth.services';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.scss'],
})
export class PasswordresetComponent implements OnInit {
  public id: string;

  constructor(private route: ActivatedRoute, private authService: AuthService) {
    this.route.params.subscribe((params) => {
      this.id = params.id;
    });
  }

  ngOnInit(): void {}

  public onSubmit(): void {
    this.authService.changePassword(this.id, 'asdfasdf', true);
  }
}
