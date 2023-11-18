import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedComponent } from './feed.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { UserService } from 'src/app/service/user.service';
import { PostService } from 'src/app/service/post.service';
import { of } from 'rxjs';
import { Post } from 'src/app/model/Post';
import { User } from 'src/app/model/User';

describe('FeedComponent', () => {
  let component: FeedComponent;
  let fixture: ComponentFixture<FeedComponent>;
  let userServiceSpy: UserService;
  let postServiceSpy: PostService;
  let mockPost: Post;
  let mockUser: User;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedComponent, HeaderComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
    });
    fixture = TestBed.createComponent(FeedComponent);
    component = fixture.componentInstance;
    userServiceSpy = TestBed.inject(UserService);
    postServiceSpy = TestBed.inject(PostService);
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
  it('should call function on ngOninit', () => {
    spyOn(component, 'storeUserData');
    spyOn(component, 'getAllPost');
    spyOn(component, 'initPostAddedSubscription');

    component.ngOnInit();

    expect(component.storeUserData).toHaveBeenCalled();
    expect(component.getAllPost).toHaveBeenCalled();
    expect(component.initPostAddedSubscription).toHaveBeenCalled();
  });
  it('should store the user data', () => {
    spyOn(userServiceSpy, 'getCurrentUser').and.returnValue(of(mockUser));
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem');

    mockUser.authUser = true;
    component.storeUserData();

    expect(component.currentUser).toEqual(mockUser);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'currentUser',
      JSON.stringify(mockUser)
    );
    expect(localStorage.getItem).toHaveBeenCalledWith('currentUser');
  });
  it('should get all the posts', () => {
    let mockPosts = [mockPost];
    spyOn(postServiceSpy, 'getPostByAuthorId').and.returnValue(of(mockPosts));
    spyOn(mockPosts, 'reverse');
    component.currentUser = mockUser;
    component.getAllPost();

    expect(postServiceSpy.getPostByAuthorId).toHaveBeenCalledWith(mockUser.id);
    expect(component.posts).toEqual(mockPosts);
    expect(mockPosts.reverse).toHaveBeenCalled();
  });
});
