import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { RestService } from '@app/shared/services';

import { Post } from '../models';
import { environment } from '../../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class PostRestService extends RestService {
  public getPost(postId: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/posts/${postId}`);
  }

  public async getPosts(): Promise<Post[]> {
    const posts = await fetch(`${environment.url}/posts`);

    return posts.json();
  }

  public async getPostFetch(postId: number): Promise<Post> {
    const posts = await fetch(`${environment.url}/posts/${postId}`);

    return posts.json();
  }
}
