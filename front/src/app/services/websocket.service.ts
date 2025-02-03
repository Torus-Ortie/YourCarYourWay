import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private stompClient: Client;
  private serverUrl = 'ws://localhost:8080/ws'; // WebSocket Endpoint

  constructor() {
    this.stompClient = new Client({
      brokerURL: this.serverUrl,
      reconnectDelay: 5000, // Reconnexion automatique après 5s
      debug: (msg: string) => console.log(msg)
    });

    this.stompClient.onConnect = () => {
      console.log('Connected to WebSocket');
      this.stompClient.subscribe('/topic/messages', (message) => {
        console.log('Message reçu :', JSON.parse(message.body));
      });
    };

    this.stompClient.activate();
  }

  sendMessage(sender: string, content: string) {
    const message = { sender, content };
    this.stompClient.publish({ destination: '/app/message', body: JSON.stringify(message) });
  }
}
