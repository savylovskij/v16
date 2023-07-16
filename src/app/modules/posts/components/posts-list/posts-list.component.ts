import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';

import { RandomRangePipe } from '@app/shared/pipes/random-range';
import { RepeatDirective } from '@app/shared/directives/repeat';
import { SkeletonComponent } from '@app/shared/components/skeleton';

import { Post } from '../../models';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgForOf, NgIf, RandomRangePipe, RepeatDirective, SkeletonComponent],
})
export class PostsListComponent {
  @Input({ required: true }) public postsLis: Post[] = [];
  @Input({ required: true }) public loading = false;

  @Output() public selectedPost = new EventEmitter<number>();
}
