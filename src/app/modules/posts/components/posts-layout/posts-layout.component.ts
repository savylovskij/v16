import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { PostService } from '../../services';
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

  public readonly postList = toSignal(this.postService.postsList$, {
    initialValue: [],
  });

  public readonly loadingPostsList = this.postService.loadingPostsList;

  public readonly post = toSignal(this.postService.post$, {
    initialValue: null,
  });

  public readonly loadingPost = this.postService.loadingPost;

  public selectedPost(id: number): void {
    this.postService.selectedPost(id);
  }
}
