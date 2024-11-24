import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { PostDetailComponent } from '../post-detail';
import { PostsListComponent } from '../posts-list';

@Component({
  selector: 'app-posts-layout',
  templateUrl: './posts-layout.component.html',
  styleUrls: ['./posts-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PostsListComponent, PostDetailComponent],
})
export class PostsLayoutComponent {
  public readonly postId = signal(0);

  public selectedPost(id: number): void {
    this.postId.set(id);
  }
}
