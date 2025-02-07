import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/websocket.service';
import { ChatMessage } from '../../interfaces/chat.interface';
import { Subject, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap, catchError, takeUntil } from 'rxjs/operators';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: ChatMessage[] = [];
  newMessage: string = '';
  currentUserId: string = '';
  reservationId: string = '';
  chatId: string = '';
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private webSocketService: WebSocketService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getUser().pipe(
      takeUntil(this.destroy$),
      switchMap(user => {
        this.currentUserId = user?.name || ''; 
        if (!this.currentUserId) return of(null);
        
        return this.route.paramMap;
      }),
      switchMap(params => {
        this.reservationId = params?.get('reservation') || '';
        if (!this.reservationId) return of(null);

        this.webSocketService.connect(this.currentUserId);
        return this.webSocketService.getMessagesList();
      }),
      catchError(_ => of([]))
    ).subscribe(messages => {
      if (messages) {
        this.messages = [...this.messages, ...messages];
      }
    });
  }

  sendMessage(): void {
    const message: ChatMessage = {
      chatId: this.chatId,
      userId: this.currentUserId,
      reservationId: this.reservationId,
      content: this.newMessage,
      createdat: new Date()
    };

    this.webSocketService.sendMessage(message);
    this.newMessage = '';
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.webSocketService.disconnect();
    this.resetChat();
  }

  private resetChat(): void {
    this.messages = [];
  }
}
