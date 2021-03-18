import { flatten } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

import { MessagingService } from '../../../services/messaging.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  public loadingLarge: boolean = false;

  constructor(private messagingService: MessagingService) {}

  ngOnInit(): void {
    this.messagingService.isLoadedBig().subscribe((loading) => {
      this.loadingLarge = loading;
    });
  }
}
