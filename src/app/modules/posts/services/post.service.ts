import { inject, Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

import { catchError, filter, finalize, of, switchMap } from 'rxjs';

import { PostRestService } from './post-rest.service';

@Injectable({ providedIn: 'root' })
export class PostService {
  public readonly isLoading = signal(false);

  private readonly selectedPostId = signal(0);

  private readonly postRestService = inject(PostRestService);

  public readonly post$ = toObservable(this.selectedPostId).pipe(
    filter<number>(Boolean),
    switchMap(postId => {
      this.isLoading.set(true);

      return this.postRestService.getPost(postId).pipe(
        catchError(() => of(null)),
        finalize(() => this.isLoading.set(false)),
      );
    }),
  );

  public selectedPost(id: number): void {
    this.selectedPostId.set(id);
  }
}
