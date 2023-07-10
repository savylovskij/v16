import { Injectable, signal } from '@angular/core';

import { User } from '../models';

interface UserState {
  loading: boolean;
  userList: User[];
}

@Injectable({ providedIn: 'root' })
export class UserStore {
  private readonly userState = signal<UserState>({
    loading: false,
    userList: [],
  });

  public readonly userList = this.userState().userList;
  public readonly loading = this.userState().loading;
}
