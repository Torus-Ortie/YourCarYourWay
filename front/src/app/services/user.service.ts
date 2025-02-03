import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  public getUser(): Observable<User> {
    return this.httpClient.get<User>(`${environment.apiUrl}/me`)
  }

  public updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(`${environment.apiUrl}/me`, user);
  }
}
