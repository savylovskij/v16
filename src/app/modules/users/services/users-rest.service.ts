import { Injectable } from '@angular/core';

import { User } from '../models';
import { environment } from '../../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class UsersRestService {
  public async getUsers(): Promise<User[]> {
    const response = await fetch(`${environment.url}/users`);

    return response.json();
  }
}
