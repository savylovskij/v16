import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

import { UserStore } from '../../services';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgOptimizedImage]
})
export class UserDetailComponent {
  private readonly userStore = inject(UserStore);

  public readonly selectedUser = this.userStore.selectedUser;
}
