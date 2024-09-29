import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { PostService, PostsService } from '../../services';
import { PostDetailComponent } from '../post-detail';
import { PostsListComponent } from '../posts-list';

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
  private readonly postsService = inject(PostsService);

  public readonly post = toSignal(this.postService.post$, {
    initialValue: null,
  });

  public readonly loadingPost = this.postService.isLoading;
  public readonly postList = toSignal(this.postsService.postsList$, {
    initialValue: [],
  });

  public readonly loadingList = this.postsService.isLoading;

  public selectedPost(id: number): void {
    this.postService.selectedPost(id);
  }
}
