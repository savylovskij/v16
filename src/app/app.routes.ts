import { Routes } from '@angular/router';

import { MainLayoutComponent } from './shared/components/main-layout';
import { UsersLayoutComponent } from './modules/users/components';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: UsersLayoutComponent },
      {
        path: 'posts',
        loadComponent: () =>
          import('./modules/posts/components').then(
            m => m.PostsLayoutComponent
          ),
      },
    ],
  },
];
