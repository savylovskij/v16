import { inject, Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

import { catchError, filter, finalize, of, switchMap } from 'rxjs';

import { PostRestService } from './post-rest.service';

@Injectable({ providedIn: 'root' })
export class PostService {
  public readonly loadingPostsList = signal(false);
  public readonly loadingPost = signal(false);

  private readonly postRestService = inject(PostRestService);

  public readonly postsList$ = of(null).pipe(
    switchMap(() => {
      this.loadingPostsList.set(true);

      return this.postRestService.getPosts().pipe(
        catchError(() => of([])),
        finalize(() => this.loadingPostsList.set(false)),
      );
    }),
  );

  private readonly selectedPostId = signal(0);

  public readonly post$ = toObservable(this.selectedPostId).pipe(
    filter<number>(Boolean),
    switchMap(postId => {
      this.loadingPost.set(true);

      return this.postRestService.getPost(postId).pipe(
        catchError(() => of(null)),
        finalize(() => this.loadingPost.set(false)),
      );
    }),
  );

  public selectedPost(id: number): void {
    this.selectedPostId.set(id);
  }
}
