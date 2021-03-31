import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkemail',
  templateUrl: './checkemail.component.html',
  styleUrls: ['./checkemail.component.scss'],
})
export class CheckemailComponent implements OnInit {
  public type: string;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.type = params.type;
    });
  }

  ngOnInit(): void {}
}
