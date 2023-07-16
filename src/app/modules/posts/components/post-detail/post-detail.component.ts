import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

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
  imports: [NgIf, RandomRangePipe, RepeatDirective, SkeletonComponent],
})
export class PostDetailComponent {
  @Input({ required: true }) public post: Post | null = null;
  @Input({ required: true }) public loading = false;
}
