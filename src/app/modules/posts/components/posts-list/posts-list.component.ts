import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsListComponent {}
