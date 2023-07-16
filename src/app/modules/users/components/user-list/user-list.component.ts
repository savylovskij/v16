import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';

import { RepeatDirective } from '@app/shared/directives/repeat';
import { RandomRangePipe } from '@app/shared/pipes/random-range';
import { SkeletonComponent } from '@app/shared/components/skeleton';

import { UserStore } from '../../services';

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgForOf, NgIf, SkeletonComponent, RepeatDirective, RandomRangePipe],
})
export class UserListComponent {
  private readonly userStore = inject(UserStore);

  public readonly userList = this.userStore.userList;
  public readonly loading = this.userStore.loading;

  public onSelectedUser(id: number): void {
    this.userStore.setSelectedUser(id);
  }
}
