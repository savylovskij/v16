import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RestService } from '@app/shared/services';

import { Post } from '../models';

@Injectable({ providedIn: 'root' })
export class PostRestService extends RestService {
  public getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts`);
  }

  public getPost(postId: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/posts/${postId}`);
  }
}
