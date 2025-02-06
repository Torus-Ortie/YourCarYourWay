import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { catchError } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private _user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public user$: Observable<User | null> = this._user.asObservable();

  private _isLoggedSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> = this._isLoggedSubject$.asObservable();

  constructor(private userService: UserService) {
    this.initializeUser();
  }

  public logIn(token: string): void {
    localStorage.setItem('token', token);
    this._isLoggedSubject$.next(true);
    this.initializeUser();
  }

  public logOut(): void {
    localStorage.removeItem('token');
    this._setUser(null);
    this._setIsLoggedIn(false);
  }

  public updateUser(updatedUser: User): void {
    this._setUser(updatedUser);
  }

  private _setUser(user: User | null): void {
    this._user.next(user);
  }

  private _setIsLoggedIn(isLoggedIn: boolean): void {
    this._isLoggedSubject$.next(isLoggedIn);
  }

  public async initializeUser(): Promise<void> {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const user = await firstValueFrom(
          this.userService.getUser().pipe(
            catchError(error => {
              if (error.status === 401) {
                console.warn('Token invalide ou expiré. Déconnexion...');
                this.logOut();
              } else {
                console.error('Erreur lors de la récupération de l’utilisateur', error);
              }
              return [];
            })
          )
        );

        if (user) {
          this._setUser(user);
          this._setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Erreur lors de l’initialisation de l’utilisateur :', error);
      }
    }
  }
}