import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { UserStore } from '../../services';

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgForOf, NgIf, MatProgressSpinnerModule],
})
export class UserListComponent {
  private readonly userStore = inject(UserStore);

  public readonly userList = this.userStore.userList;
  public readonly loading = this.userStore.loading;

  public onSelectedUser(id: number): void {
    this.userStore.setSelectedUser(id);
  }
}
