import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  linkedSignal,
  resource,
  signal,
} from '@angular/core';

import { UsersRestService } from '../../services';
import { User } from '../../models';
import { UserDetailComponent } from '../user-detail';
import { UsersListComponent } from '../users-list';

@Component({
  selector: 'app-users-layout',
  templateUrl: './users-layout.component.html',
  styleUrls: ['./users-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UsersListComponent, UserDetailComponent],
})
export class UsersLayoutComponent {
  private readonly restService = inject(UsersRestService);

  private readonly selectedUserId = signal(0);

  private readonly usersRequest = resource({
    loader: () => this.restService.getUsers(),
  });

  public readonly userList = computed(() => this.usersRequest.value() ?? []);
  public readonly isLoading = this.usersRequest.isLoading;

  public readonly selectedUser = linkedSignal({
    source: this.selectedUserId,
    computation: () => {
      return this.userList()?.find(({ id }) => this.selectedUserId() === id);
    },
  });

  public setSelectedUser({ id }: User): void {
    this.selectedUserId.set(id);
  }
}
