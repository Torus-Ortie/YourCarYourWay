import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subject } from 'rxjs';
import { SessionService } from '../../services/session.service';
import { takeUntil } from 'rxjs/operators';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  user: User | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.sessionService.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => this.user = user);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
