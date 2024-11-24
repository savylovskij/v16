import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

import { SkeletonComponent } from '@app/shared/components/skeleton';
import { RepeatDirective } from '@app/shared/directives/repeat';
import { RandomRangePipe } from '@app/shared/pipes/random-range';

import { Post } from '../../models';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RandomRangePipe, RepeatDirective, SkeletonComponent],
})
export class PostsListComponent {
  public readonly postsLis = input<Post[]>([]);
  public readonly isLoading = input(false);

  public selectedPost = output<number>();
}
