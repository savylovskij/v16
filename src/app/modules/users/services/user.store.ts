import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, finalize, of, switchMap, take } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

import { UsersRest } from './users.rest';

@Injectable({ providedIn: 'root' })
export class UserStore {
  private readonly userRest = inject(UsersRest);

  public readonly loading = signal(false);

  private readonly userList$ = of(null).pipe(
    switchMap(() => {
      this.loading.set(true);

      return this.userRest.getUsers().pipe(
        take(1),
        catchError(() => of([])),
        finalize(() => this.loading.set(false))
      );
    })
  );

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