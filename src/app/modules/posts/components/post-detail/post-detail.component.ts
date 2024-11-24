import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { SkeletonComponent } from '@app/shared/components/skeleton';
import { RepeatDirective } from '@app/shared/directives/repeat';
import { RandomRangePipe } from '@app/shared/pipes/random-range';

import { Post } from '../../models';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RandomRangePipe, RepeatDirective, SkeletonComponent],
})
export class PostDetailComponent {
  public readonly post = input<Post | null>(null);
  public readonly isLoading = input(false);
}
