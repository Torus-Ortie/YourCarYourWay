import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private stompClient!: Client;
  private isConnected = false;
  private messagesSubject = new BehaviorSubject<string[]>([]);
  public messages$ = this.messagesSubject.asObservable();

  constructor() {
    this.connect();
  }

  private connect(): void {
    const socket = new SockJS('http://localhost:8080/ws'); // URL définie en backend
    this.stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000, // Tentative de reconnexion automatique
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    this.stompClient.onConnect = () => {
      console.log('✅ WebSocket connecté');
      this.isConnected = true;

      // S'abonner aux messages reçus sur /topic/messages
      this.stompClient.subscribe('/topic/messages', (message: Message) => {
        console.log('📩 Message reçu :', message.body);
        this.messagesSubject.next([...this.messagesSubject.value, message.body]);
      });
    };

    this.stompClient.onDisconnect = () => {
      console.log('❌ WebSocket déconnecté');
      this.isConnected = false;
    };

    this.stompClient.activate();
  }

  sendMessage(content: string, reservationId: number): void {
    if (this.isConnected) {
      const message = { content, reservationId };
      this.stompClient.publish({
        destination: '/app/message', // Doit correspondre à `@MessageMapping("/message")` en backend
        body: JSON.stringify(message),
      });
    } else {
      console.warn('⚠️ Impossible d\'envoyer le message, WebSocket non connecté.');
    }
  }
}
