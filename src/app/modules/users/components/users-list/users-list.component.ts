import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { RepeatDirective } from '@app/shared/directives/repeat';
import { RandomRangePipe } from '@app/shared/pipes/random-range';
import { SkeletonComponent } from '@app/shared/components/skeleton';

import { UserStore } from '../../services';

@Component({
  selector: 'app-users-list',
  standalone: true,
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SkeletonComponent, RepeatDirective, RandomRangePipe],
})
export class UsersListComponent {
  private readonly userStore = inject(UserStore);

  public readonly userList = this.userStore.userList;
  public readonly loading = this.userStore.loading;

  public onSelectedUser(id: number): void {
    this.userStore.setSelectedUser(id);
  }
}
