import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainLayoutComponent } from './shared/components/main-layout';
import { UsersLayoutComponent } from './modules/users/components';

const routes: Routes = [
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
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
    }),
  ],
})
export class AppRoutingModule {}
