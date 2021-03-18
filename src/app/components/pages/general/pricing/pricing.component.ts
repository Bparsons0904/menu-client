import { Component, OnInit, HostListener } from '@angular/core';
import {
  FaIconComponent,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
})
export class PricingComponent implements OnInit {
  faCheck = faCheck;
  constructor() {}

  public width: number = 200;
  public height: number = 200;
  public calcHeight: number = 200;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.sizeVideoWindow();
  }

  ngOnInit(): void {
    this.sizeVideoWindow();
  }

  private sizeVideoWindow(): void {
    this.width = window.innerWidth;
    this.width = this.width > 750 ? 750 : this.width;
    this.height = this.width * 0.5625;
    document.getElementById('yt-container').style.height = `${this.height.toString()}px`;
  }
}
