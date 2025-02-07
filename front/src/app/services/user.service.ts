import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private onlineUsersSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  onlineUsers$: Observable<any[]> = this.onlineUsersSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  public getUser(): Observable<User> {
    return this.httpClient.get<User>(`${environment.apiUrl}/me`)
  }

  getUsers(): Observable<any[]> {
    return this.onlineUsers$;
  }

  public refreshUsers(): void {
    this.httpClient.get<any[]>(`${environment.apiUrl}/all`).subscribe(users => {
      this.onlineUsersSubject.next(users);
    });
  }

  public updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(`${environment.apiUrl}/me`, user);
  }
}
