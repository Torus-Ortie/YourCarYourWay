import { Component } from '@angular/core';
import { WebSocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  message = '';
  messages: string[] = [];
  reservationId = 1; // ID fictif, adapte-le selon ton cas

  constructor(private webSocketService: WebSocketService) {
    this.webSocketService.messages$.subscribe((msgs) => {
      this.messages = msgs;
    });
  }

  sendMessage(): void {
    if (this.message.trim()) {
      this.webSocketService.sendMessage(this.message, this.reservationId);
      this.message = '';
    }
  }
}
