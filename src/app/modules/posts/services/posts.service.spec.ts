import { TestBed } from '@angular/core/testing';

import { finalize, of, take, tap, throwError } from 'rxjs';

import { PostRestService } from './post-rest.service';
import { PostsService } from './posts.service';
import { Post } from '../models';

describe('PostsService', () => {
  let service: PostsService;
  let postRestServiceSpy: jasmine.SpyObj<PostRestService>;

  beforeEach(() => {
    const postRestServiceMock = jasmine.createSpyObj('PostRestService', [
      'getPosts',
    ]);

    TestBed.configureTestingModule({
      providers: [
        PostsService,
        { provide: PostRestService, useValue: postRestServiceMock },
      ],
    });

    service = TestBed.inject(PostsService);
    postRestServiceSpy = TestBed.inject(
      PostRestService,
    ) as jasmine.SpyObj<PostRestService>;
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });

  it('should set initialize isLoading false', () => {
    expect(service.isLoading()).toBeFalsy();
  });

  it('should set isLoading to true when postsList$ is subscribed and false after completion', () => {
    postRestServiceSpy.getPosts.and.returnValue(of([]));

    service.postsList$
      .pipe(
        tap(() => expect(service.isLoading()).toBeTruthy()),
        take(1),
        finalize(() => expect(service.isLoading()).toBeFalsy()),
      )
      .subscribe();
  });

  it('should handle errors and update isLoading signal', () => {
    postRestServiceSpy.getPosts.and.returnValue(
      throwError(() => new Error('Network error')),
    );

    service.postsList$
      .pipe(
        take(1),
        finalize(() => expect(service.isLoading()).toBeFalsy()),
      )
      .subscribe();
  });

  it('should receive posts data', () => {
    const mockPosts = [
      { id: 1, title: 'Post 1' },
      { id: 2, title: 'Post 2' },
    ] as Post[];
    postRestServiceSpy.getPosts.and.returnValue(of(mockPosts));

    service.postsList$
      .pipe(take(1))
      .subscribe(result => expect(result).toEqual(mockPosts));
  });
});
