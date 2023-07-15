import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

import { UsersRest } from './users.rest';

@Injectable({ providedIn: 'root' })
export class UserStore {
  private readonly userRest = inject(UsersRest);

  private readonly userList$ = this.userRest
    .getUsers()
    .pipe(catchError(() => of([])));

  public readonly userList = toSignal(this.userList$, {
    initialValue: [],
  });

  public readonly selectedUserId = signal(0);

  public readonly selectedUser = computed(() =>
    this.userList().find(({ id }) => this.selectedUserId() === id)
  );

  public setSelectedUser(id: number): void {
    this.selectedUserId.set(id);
  }
}
