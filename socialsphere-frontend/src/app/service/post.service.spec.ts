import { TestBed } from '@angular/core/testing';

import { PostService } from './post.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from '../model/User';
import { Post } from '../model/Post';

describe('PostService', () => {
  let postService: PostService;
  let mockUser: User;
  let mockPost: Post;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    postService = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
    mockUser = {
      id: 1,
      name: 'aman user',
      email: 'test@test.com',
      password: '123',
      profilePhotoUrl: '',
      coverPhotoUrl: '',
      gender: '',
      bio: '',
      followerCount: 0,
      followingCount: 0,
      createdAt: '',
      updatedAt: '',
      authUser: false,
    };
    mockPost = {
      id: 1,
      content: 'string',
      postPhoto: 'string',
      likeCount: 0,
      commentCount: 0,
      author: {
        id: 1,
        name: 'string',
        email: 'string',
        password: 'string',
        profilePhotoUrl: 'string',
        coverPhotoUrl: 'string',
        gender: 'string',
        bio: 'string',
        followerCount: 1,
        followingCount: 1,
        createdAt: 'string',
        updatedAt: 'string',
        authUser: false,
      },
      likedByUser: false,
      likedUserIds: ['1', '2'],
    };
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(postService).toBeTruthy();
  });
  it('should add a post', () => {
    let mockAddPost = {
      content: 'Hey',
      postPhoto: 'location',
      email: 'test@test.com',
    };

    postService.addPost(mockAddPost).subscribe((post) => {
      expect(post).toEqual(mockPost);
    });

    const req = httpMock.expectOne(`${postService.apiBaseUrl}/addpost`);
    expect(req.request.method).toBe('POST');
    req.flush(mockPost);
  });
  it('should get posts by user id', () => {
    let id = 101;
    let mockPosts = [mockPost];

    postService.getPostByAuthorId(id).subscribe((posts) => {
      expect(posts).toEqual(mockPosts);
    });

    const req = httpMock.expectOne(
      `${postService.apiBaseUrl}/getallpost/${id}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);
  });
  it('should delete post ', () => {
    let id = 101;

    postService.deletePost(id).subscribe((posts) => {
      expect(posts).toEqual(null);
    });

    const req = httpMock.expectOne(
      `${postService.apiBaseUrl}/post/delete/${id}`
    );
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
  it('should like the post', () => {
    let postId = 1;
    let userId = 2;
    postService.like(postId, userId).subscribe((post) => {
      expect(post).toEqual(mockPost);
    });

    const req = httpMock.expectOne(
      `${postService.apiBaseUrl}/posts/${postId}/like`
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockPost);
  });
  it('should unlike the post', () => {
    let postId = 1;
    let userId = 2;
    postService.unlike(postId, userId).subscribe((post) => {
      expect(post).toEqual(mockPost);
    });

    const req = httpMock.expectOne(
      `${postService.apiBaseUrl}/posts/${postId}/unlike`
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockPost);
  });
  it('should add comment to the post', () => {
    let postId = 1;
    let mockCommentReq = {
      email: 'test@test.com',
      content: 'hey nice bro',
    };
    let mockComment = {
      id: 1,
      content: 'hey nice bro',
      auther: mockUser,
    };
    postService.addComment(postId, mockCommentReq).subscribe((comment) => {
      expect(comment).toEqual(mockComment);
    });

    const req = httpMock.expectOne(
      `${postService.apiBaseUrl}/post/${postId}/comments/create`
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCommentReq);
    req.flush(mockComment);
  });
  it('should get comment to the post', () => {
    let postId = 1;
    let mockComment = [
      {
        id: 1,
        content: 'hey nice bro',
        auther: mockUser,
      },
    ];
    postService.getComments(postId).subscribe((comment) => {
      expect(comment).toEqual(mockComment);
    });

    const req = httpMock.expectOne(
      `${postService.apiBaseUrl}/post/${postId}/comments`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockComment);
  });
});
