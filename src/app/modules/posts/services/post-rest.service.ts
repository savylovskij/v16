import { Injectable } from '@angular/core';

import { Post } from '../models';
import { environment } from '../../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class PostRestService {
  public async getPosts(): Promise<Post[]> {
    const posts = await fetch(`${environment.url}/posts`);

    return posts.json();
  }

  public async getPost(postId: number): Promise<Post> {
    const posts = await fetch(`${environment.url}/posts/${postId}`);

    return posts.json();
  }
}
