import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RestService } from '@app/shared/services';

import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class UsersRestService extends RestService {
  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }
}
