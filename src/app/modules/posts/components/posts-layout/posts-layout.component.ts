import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { PostService } from '../../services';
import { PostsListComponent } from '../posts-list';
import { PostDetailComponent } from '../post-detail';

@Component({
  selector: 'app-posts-layout',
  standalone: true,
  templateUrl: './posts-layout.component.html',
  styleUrls: ['./posts-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PostsListComponent, PostDetailComponent],
})
export class PostsLayoutComponent {
  private readonly postService = inject(PostService);

  public readonly postList = this.postService.postsList;
  public readonly loadingPostsList = this.postService.loadingPostsList;

  public readonly post = this.postService.post;
  public readonly loadingPost = this.postService.loadingPost;

  public selectedPost(id: number): void {
    this.postService.selectedPost(id);
  }
}
