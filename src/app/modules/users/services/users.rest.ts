import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RestService } from '@app/shared/services';

import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class UsersRest extends RestService {
  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  public getUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${userId}`);
  }
}
