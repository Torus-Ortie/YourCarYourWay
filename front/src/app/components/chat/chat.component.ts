import { Component, OnInit } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  private socket$!: WebSocketSubject<string>;
  messages: string[] = [];
  message: string = '';

  ngOnInit(): void {
    this.socket$ = new WebSocketSubject('ws://localhost:8080/chat'); // Remplace avec ton URL WebSocket

    this.socket$.subscribe(
      (msg) => this.messages.push(msg),
      (err) => console.error('WebSocket error:', err),
      () => console.warn('WebSocket closed!')
    );
  }

  sendMessage(): void {
    if (this.message.trim()) {
      this.socket$.next(this.message);
      this.message = ''; // Réinitialise le champ après envoi
    }
  }
}
