import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';

import { UserStore } from '../../services';

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgForOf, NgIf],
})
export class UserListComponent {
  private readonly userStore = inject(UserStore);

  public readonly userList = this.userStore.userList;

  public onSelectedUser(id: number): void {
    this.userStore.setSelectedUser(id);
  }
}
