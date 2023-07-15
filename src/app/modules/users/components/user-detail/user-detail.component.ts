import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgIf, NgOptimizedImage } from '@angular/common';

import { UserStore } from '../../services';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, NgIf],
})
export class UserDetailComponent {
  private readonly userStore = inject(UserStore);

  public readonly selectedUser = this.userStore.selectedUser;
}
