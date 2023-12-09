import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { PostService } from 'src/app/service/post.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { User } from 'src/app/model/User';
import { Post } from 'src/app/model/Post';
import { of } from 'rxjs';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let postServiceSpy: PostService;
  let routeSpy: ActivatedRoute;
  
  let toastServiceSpy: HotToastService;
  let mockUser: User;
  let mockPost: Post;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      providers: [PostComponent],
    });
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;

    postServiceSpy = TestBed.inject(PostService);
    routeSpy = TestBed.inject(ActivatedRoute);
    toastServiceSpy = TestBed.inject(HotToastService);
    fixture.detectChanges();
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize post like subscription, unlike subscription and get comments on init', () => {
    spyOn(component, 'initPostLikeSubscription');
    spyOn(component, 'initPostUnlikeSubscription');
    spyOn(component, 'getComment');

    component.ngOnInit();

    expect(component.initPostLikeSubscription).toHaveBeenCalled();
    expect(component.initPostUnlikeSubscription).toHaveBeenCalled();
    expect(component.getComment).toHaveBeenCalled();
  });

  it('should initialize loggedUser to the current User on init', () => {
    localStorage.setItem('currentUser', JSON.stringify(mockUser));

    component.ngOnInit();

    expect(component.loggedUser).toEqual(mockUser);
  });

  it('should call handleUnlike if user has liked post', () => {
    component.loggedUser = mockUser;
    component.post = mockPost;

    spyOn(component, 'handleUnLike');

    component.toggleLike();

    expect(component.handleUnLike).toHaveBeenCalled();
  });

  it('should call handlelike if user has not liked post', () => {
    mockPost.likedUserIds = ['2', '3'];
    component.loggedUser = mockUser;
    component.post = mockPost;

    spyOn(component, 'handleLike');

    component.toggleLike();

    expect(component.handleLike).toHaveBeenCalled();
  });
  // it('should return correct value based on route config', () => {});
  it('should handle like of post', () => {
    component.loggedUser = mockUser;
    component.post = mockPost;

    spyOn(postServiceSpy, 'like').and.returnValue(of(mockPost));

    let post = component.handleLike();
    expect(postServiceSpy.like).toHaveBeenCalledWith(mockPost.id, mockUser.id);
    expect(post).toEqual(mockPost);
  });
  it('should handle unlike of post', () => {
    component.loggedUser = mockUser;
    component.post = mockPost;

    spyOn(postServiceSpy, 'unlike').and.returnValue(of(mockPost));

    let post = component.handleUnLike();
    expect(postServiceSpy.unlike).toHaveBeenCalledWith(
      mockPost.id,
      mockUser.id
    );
    expect(post).toEqual(mockPost);
  });
  it('should delete post by id', () => {
    component.post = mockPost;
    spyOn(postServiceSpy, 'deletePost').and.returnValue(of(null));
    spyOn(toastServiceSpy, 'success');
    const postAddedSpy = spyOn(postServiceSpy.postAdded, 'next');

    component.deletePost(mockPost.id);

    expect(postServiceSpy.deletePost).toHaveBeenCalledOnceWith(mockPost.id);
    expect(postAddedSpy).toHaveBeenCalledWith(true);
    expect(toastServiceSpy.success).toHaveBeenCalledOnceWith('Delete Success', {
      position: 'top-right',
    });
  });

  it('should create comment on post', () => {
    const mockCommentInput = {
      content: 'test comment',
      email: 'test@test.com',
    };
    const mockCommentResponse = {
      id: 1,
      content: 'test comment',
      auther: mockUser,
    };
    component.commentReq = mockCommentInput;
    component.post = mockPost;

    spyOn(postServiceSpy, 'addComment').and.returnValue(
      of(mockCommentResponse)
    );

    component.handleComment(mockCommentInput);

    expect(postServiceSpy.addComment).toHaveBeenCalledWith(
      mockPost.id,
      mockCommentInput
    );
  });
  it('should get all comments of post', () => {
    const mockComments = [
      {
        id: 1,
        content: 'test comment',
        auther: mockUser,
      },
      {
        id: 2,
        content: 'test comment',
        auther: mockUser,
      },
    ];
    component.post = mockPost;
    spyOn(postServiceSpy, 'getComments').and.returnValue(of(mockComments));
    spyOn(mockComments, 'reverse');

    component.getComment();

    expect(postServiceSpy.getComments).toHaveBeenCalledWith(mockPost.id);
    expect(component.comments).toEqual(mockComments);
    expect(mockComments.reverse).toHaveBeenCalled();
  });
});
