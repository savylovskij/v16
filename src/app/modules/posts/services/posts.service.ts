import { inject, Injectable, signal } from '@angular/core';

import { catchError, finalize, of, switchMap } from 'rxjs';

import { PostRestService } from './post-rest.service';

@Injectable({ providedIn: 'root' })
export class PostsService {
  public readonly isLoading = signal(false);

  private readonly postRestService = inject(PostRestService);

  public readonly postsList$ = of(null).pipe(
    switchMap(() => {
      this.isLoading.set(true);

      return this.postRestService.getPosts().pipe(
        catchError(() => of([])),
        finalize(() => this.isLoading.set(false)),
      );
    }),
  );
}
