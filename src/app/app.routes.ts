import { Routes } from '@angular/router';

import { UsersLayoutComponent } from './modules/users/components';
import { MainLayoutComponent } from './shared/components/main-layout';

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
            m => m.PostsLayoutComponent,
          ),
        title: 'Posts List',
      },
    ],
  },
];
