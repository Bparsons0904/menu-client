import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../../../services/messaging.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  public errorMessage: string = '';
  public infoMessage: string = '';

  constructor(private messMessagingService: MessagingService) {}

  ngOnInit(): void {
    this.messMessagingService
      .getErrorMessage()
      .subscribe((message) => (this.errorMessage = message));
    this.messMessagingService
      .getInfoMessage()
      .subscribe((message) => (this.infoMessage = message));
  }
}
