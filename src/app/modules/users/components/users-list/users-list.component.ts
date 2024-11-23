import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

import { SkeletonComponent } from '@app/shared/components/skeleton';
import { RepeatDirective } from '@app/shared/directives/repeat';
import { RandomRangePipe } from '@app/shared/pipes/random-range';

import { User } from '../../models';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SkeletonComponent, RandomRangePipe, RepeatDirective],
})
export class UsersListComponent {
  public readonly userList = input<User[]>([]);
  public readonly isLoading = input(false);

  public readonly selectedUser = output<User>();
}
