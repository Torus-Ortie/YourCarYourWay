import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ChatMessage } from '../../interfaces/chat.interface';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  messageContent = '';
  messages: ChatMessage[] = [];
  user: User | null = null;
  otherUserName: string = '';
  private messagesSubscription!: Subscription;
  private destroy$ = new Subject<void>();

  constructor(
    private chatService: ChatService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userService.getUser().pipe(takeUntil(this.destroy$)
    ).subscribe(user => {
      if (user) {
        this.user = user;
      }
    });

    this.otherUserName = this.route.snapshot.paramMap.get('name') || 'Utilisateur inconnu';

    this.messagesSubscription = this.chatService.messages$.subscribe(
      (msgs) => {
        this.messages = msgs;
      }
    );
  }

  sendMessage(): void {
    if (this.messageContent.trim() || !this.user) {
      const currentUserName = `${this.user?.name}`;
      this.chatService.sendMessage(this.messageContent, currentUserName);
      this.messageContent = '';
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }
  }
}
