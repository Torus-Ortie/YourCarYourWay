import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ChatMessage } from '../../interfaces/chat.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  messageContent = '';
  messages: ChatMessage[] = [];
  private messagesSubscription!: Subscription;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.messagesSubscription = this.chatService.messages$.subscribe(
      (msgs) => {
        this.messages = msgs;
      }
    );
  }

  sendMessage(): void {
    if (this.messageContent.trim()) {
      this.chatService.sendMessage(this.messageContent, 'reservation-123');
      this.messageContent = '';
    }
  }

  ngOnDestroy(): void {
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }
  }
}
