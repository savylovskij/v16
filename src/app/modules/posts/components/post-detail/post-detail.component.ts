import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  resource,
} from '@angular/core';

import { SkeletonComponent } from '@app/shared/components/skeleton';
import { RepeatDirective } from '@app/shared/directives/repeat';
import { RandomRangePipe } from '@app/shared/pipes/random-range';

import { PostRestService } from '../../services';
import { Post } from '../../models';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RandomRangePipe, RepeatDirective, SkeletonComponent],
})
export class PostDetailComponent {
  public readonly postId = input.required<number>();

  private readonly restService = inject(PostRestService);

  private readonly postRequest = resource<Post, { id: number }>({
    request: () => ({ id: this.postId() }),
    loader: ({ request }) => this.restService.getPost(request.id),
  });

  protected readonly post = this.postRequest.value;
  protected readonly isLoading = this.postRequest.isLoading;
}
