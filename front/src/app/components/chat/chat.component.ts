import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/websocket.service';
import { ChatMessage } from '../../interfaces/chat.interface';
import { Subscription, of, filter } from 'rxjs';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { switchMap, catchError, finalize } from 'rxjs/operators';
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
  private userProfileSubscription: Subscription | null = null;
  private routeSubscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private webSocketService: WebSocketService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userProfileSubscription = this.userService.getUser().pipe(
      switchMap(user => {
        this.currentUserId = user?.name || '';

        if (!this.currentUserId) {
          return of(null);
        }

        return this.route.paramMap;
      }),
      switchMap(params => {
        if (!params) {
          return of(null);
        }

        const reservation = params.get('reservation');

        if (!reservation) {
          return of(null);
        }

        this.reservationId = reservation;
        this.webSocketService.connect(this.currentUserId);

        return this.webSocketService.getMessagesList();
      }),
      catchError(_error => {
        return of([]);
      }),
      finalize(() => {
        this.messages = [];
      })
    ).subscribe(messages => {
      if (messages) {
        this.messages = [...this.messages, ...messages];
      }
    });

    this.routeSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {

      this.resetChat();
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
    this.userProfileSubscription?.unsubscribe();
    this.webSocketService.disconnect();
  }

  private resetChat(): void {
    this.messages = [];
  }
}
