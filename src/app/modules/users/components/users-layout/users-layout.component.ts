import { ChangeDetectionStrategy, Component } from '@angular/core';

import { UsersListComponent } from '../users-list';
import { UserDetailComponent } from '../user-detail';

@Component({
    selector: 'app-users-layout',
    templateUrl: './users-layout.component.html',
    styleUrls: ['./users-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [UsersListComponent, UserDetailComponent]
})
export class UsersLayoutComponent {}
