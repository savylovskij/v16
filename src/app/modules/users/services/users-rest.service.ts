import { Injectable } from '@angular/core';

import { RestService } from '@app/shared/services';

import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class UsersRestService extends RestService {
  public async getUsers(): Promise<User[]> {
    const response = await fetch(`${this.apiUrl}/users`);

    return await response.json();
  }
}
