import { ChangeDetectionStrategy, Component } from '@angular/core';

import { UserListComponent } from '../user-list';
import { UserDetailComponent } from '../user-detail';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UserListComponent, UserDetailComponent],
})
export class UserLayoutComponent {}
