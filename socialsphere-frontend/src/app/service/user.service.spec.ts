import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from '../model/User';
import { Post } from '../model/Post';

describe('UserService', () => {
  let userService: UserService;
  let mockUser: User;
  let mockPost: Post;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    userService = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
    mockUser = {
      id: 1,
      name: 'aman user',
      email: 'test@test.com',
      password: '123',
      profilePhotoUrl: '',
      coverPhotoUrl: '',
      gender: 'male',
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

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });
  it('should add a user', () => {
    let mockAddedUser = {
      name: 'aman user',
      email: 'test@test.com',
      password: '123',
      profilePhoto: '',
      coverPhoto: '',
      bio: '',
      gender: 'male',
    };

    userService.addUser(mockAddedUser).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${userService.apiBaseUrl}/api/signup`);
    expect(req.request.method).toBe('POST');
    req.flush(mockUser);
  });
  it('should login a user', () => {
    let mockLogin = {
      email: 'test@test.com',
      password: '123',
    };

    userService.checkUser(mockLogin).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${userService.apiBaseUrl}/api/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockUser);
  });
  it('should get user by id', () => {
    let id = 2;

    userService.getUserById(id).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${userService.apiBaseUrl}/api/user/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should update the user', () => {
    let userId = 2;
    let mockUpdateUser = mockUser;
    mockUpdateUser.name = 'test';
    userService.updateUser(mockUpdateUser, userId).subscribe((user) => {
      expect(user).toEqual(mockUpdateUser);
    });
    const req = httpMock.expectOne(
      `${userService.apiBaseUrl}/api/user/${userId}/update`
    );
    expect(req.request.method).toBe('PUT');
    req.flush(mockUpdateUser);
  });
  it('should search for users', () => {
    let mockUsers = [mockUser];

    userService.searchUser('test').subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne((req) => {
      console.log(req);
      return (
        req.url === `${userService.apiBaseUrl}/api/user/search` &&
        req.params.has('query')
      );
    });

    expect(req.request.method).toBe('GET');

    req.flush(mockUsers);
  });
});
