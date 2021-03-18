import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../../../services/messaging.service';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.scss'],
})
export class WaitingComponent implements OnInit {
  public loadingSmall: boolean = false;
  constructor(private messagingService: MessagingService) {}

  ngOnInit(): void {
    this.messagingService.isLoadedSmall().subscribe((loading) => {
      this.loadingSmall = loading;
      console.log({ loading });
    });
  }
}
