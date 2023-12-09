import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProfileComponent } from './profile.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { UserService } from 'src/app/service/user.service';
import { PostService } from 'src/app/service/post.service';
import { User } from 'src/app/model/User';
import { Post } from 'src/app/model/Post';
import { of } from 'rxjs';
import { Route } from '@angular/router';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let userServiceSpy: UserService;
  let postServiceSpy: PostService;
  let mockUser: User;
  let mockPost: Post;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      declarations: [ProfileComponent, HeaderComponent],
    });
    fixture = TestBed.createComponent(ProfileComponent);
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
  it('should update user via service', () => {
    // mock form data
    let mockUpdate = mockUser;
    mockUpdate.name = 'test';

    // spy on user service
    spyOn(userServiceSpy, 'updateUser').and.returnValue(of(mockUser));
    spyOn(localStorage, 'setItem');
    component.currentUser = mockUser;

    // call method with mock data
    component.updateUser(mockUpdate);

    // assert service called
    expect(userServiceSpy.updateUser).toHaveBeenCalledWith(
      mockUpdate,
      component.currentUser.id
    );

    // assert local storage updated
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'currentUser',
      JSON.stringify(mockUser)
    );

    // assert currentUser updated
    expect(component.currentUser).toEqual(mockUser);
  });

  it('should get all posts', () => {
    let mockPosts = [mockPost];
    spyOn(postServiceSpy, 'getPostByAuthorId').and.returnValue(of(mockPosts));
    spyOn(mockPosts, 'reverse');
    component.currentUser = mockUser;
    component.getPosts();

    expect(postServiceSpy.getPostByAuthorId).toHaveBeenCalledWith(mockUser.id);
    expect(component.posts).toEqual(mockPosts);
    expect(mockPosts.reverse).toHaveBeenCalled();
  });

  it('should get all posts of search User', () => {
    let mockPosts = [mockPost];
    spyOn(postServiceSpy, 'getPostByAuthorId').and.returnValue(of(mockPosts));
    spyOn(mockPosts, 'reverse');
    component.searchUser = mockUser;
    component.getPostsOfSearchUser();

    expect(postServiceSpy.getPostByAuthorId).toHaveBeenCalledWith(mockUser.id);
    expect(component.posts).toEqual(mockPosts);
    expect(mockPosts.reverse).toHaveBeenCalled();
  });
});
