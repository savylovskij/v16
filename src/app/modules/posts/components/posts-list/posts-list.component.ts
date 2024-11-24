import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
  resource,
} from '@angular/core';

import { SkeletonComponent } from '@app/shared/components/skeleton';
import { RepeatDirective } from '@app/shared/directives/repeat';
import { RandomRangePipe } from '@app/shared/pipes/random-range';

import { PostRestService } from '../../services';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RandomRangePipe, RepeatDirective, SkeletonComponent],
})
export class PostsListComponent {
  public readonly selectedPost = output<number>();

  private readonly restService = inject(PostRestService);

  private readonly postsRequest = resource({
    loader: () => this.restService.getPosts(),
  });

  protected readonly postsLis = this.postsRequest.value;
  protected readonly isLoading = this.postsRequest.isLoading;
}
