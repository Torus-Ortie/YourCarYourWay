import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { environment } from '../../environments/environment';
import { ChatMessage } from '../interfaces/chat.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private stompClient!: Client;
  private messagesSubject = new BehaviorSubject<ChatMessage[]>([]);
  messages$ = this.messagesSubject.asObservable();

  constructor() {
    this.connect();
  }

  private connect(): void {
    const socket = new SockJS(environment.wsUrl);
    this.stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
    });

    this.stompClient.onConnect = () => {
      console.log('WebSocket connecté');
      this.stompClient.subscribe('/topic/chat', (message) => {
        if (message.body) {
          const receivedMessage: ChatMessage = JSON.parse(message.body);
          this.messagesSubject.next([...this.messagesSubject.getValue(), receivedMessage]);
        }
      });
    };

    this.stompClient.activate();
  }

  sendMessage(content: string, reservationId: string) {
    const chatMessage: ChatMessage = { content, reservationId };
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({
        destination: '/api/chat.sendMessage',
        body: JSON.stringify(chatMessage),
      });
    }
  }
}
