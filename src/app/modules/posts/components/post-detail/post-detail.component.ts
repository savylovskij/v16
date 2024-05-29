import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { RandomRangePipe } from '@app/shared/pipes/random-range';
import { RepeatDirective } from '@app/shared/directives/repeat';
import { SkeletonComponent } from '@app/shared/components/skeleton';

import { Post } from '../../models';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RandomRangePipe, RepeatDirective, SkeletonComponent],
})
export class PostDetailComponent {
  public readonly post = input<Post | null>(null);
  public readonly loading = input(false);
}
