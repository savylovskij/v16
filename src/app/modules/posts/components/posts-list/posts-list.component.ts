import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  input,
  Output,
} from '@angular/core';

import { RandomRangePipe } from '@app/shared/pipes/random-range';
import { RepeatDirective } from '@app/shared/directives/repeat';
import { SkeletonComponent } from '@app/shared/components/skeleton';

import { Post } from '../../models';

@Component({
    selector: 'app-posts-list',
    templateUrl: './posts-list.component.html',
    styleUrls: ['./posts-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RandomRangePipe, RepeatDirective, SkeletonComponent]
})
export class PostsListComponent {
  public readonly postsLis = input<Post[]>([]);
  public readonly loading = input(false);

  @Output() public selectedPost = new EventEmitter<number>();
}
