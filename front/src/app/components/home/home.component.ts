import {Component, OnDestroy, OnInit} from '@angular/core';
import { of, Subject, Subscription } from 'rxjs';
import { catchError, finalize, switchMap, takeUntil } from 'rxjs/operators';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  name: string = '';
  role: string = '';
  user: User | null = null;
  private destroy$ = new Subject<void>();
  private userProfileSubscription: Subscription | null = null;

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userProfileSubscription = this.userService.getUser().pipe(
      takeUntil(this.destroy$),
      catchError(_error => {
        console.error('Erreur lors de la récupération de l\'utilisateur', _error);
        return of(null);
      })
    ).subscribe(user => {
      if (user) {
        this.name = user.name;
        this.role = user.role;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
