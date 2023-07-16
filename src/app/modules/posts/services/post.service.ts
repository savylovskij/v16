import { inject, Injectable, signal } from '@angular/core';
import { catchError, filter, finalize, of, switchMap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

import { PostRestService } from './post-rest.service';

@Injectable({ providedIn: 'root' })
export class PostService {
  private readonly postRestService = inject(PostRestService);

  public readonly loadingPostsList = signal(false);
  public readonly loadingPost = signal(false);

  private readonly postsList$ = of(null).pipe(
    switchMap(() => {
      this.loadingPostsList.set(true);

      return this.postRestService.getPosts().pipe(
        catchError(() => of([])),
        finalize(() => this.loadingPostsList.set(false))
      );
    })
  );

  public readonly postsList = toSignal(this.postsList$, {
    initialValue: [],
  });

  private readonly selectedPostId = signal(0);

  private readonly post$ = toObservable(this.selectedPostId).pipe(
    filter<number>(Boolean),
    switchMap(postId => {
      this.loadingPost.set(true);

      return this.postRestService.getPost(postId).pipe(
        catchError(() => of(null)),
        finalize(() => this.loadingPost.set(false))
      );
    })
  );

  public readonly post = toSignal(this.post$, { initialValue: null });

  public selectedPost(id: number): void {
    this.selectedPostId.set(id);
  }
}
