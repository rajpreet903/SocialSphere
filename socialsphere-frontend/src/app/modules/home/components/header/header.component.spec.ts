import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { PostService } from 'src/app/service/post.service';
import { UserService } from 'src/app/service/user.service';
import { HotToastService } from '@ngneat/hot-toast';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let postService: PostService;
  let userService: UserService;
  let toastService: HotToastService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      providers: [FormsModule, NgForm],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    postService = TestBed.inject(PostService);
    userService = TestBed.inject(UserService);
    toastService = TestBed.inject(HotToastService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('post content is empty', () => {
    const mockPost = {
      content: '',
      postPhoto: 'Nice',
      email: 'good',
    };
    spyOn(toastService, 'info');
    component.addNewPost(mockPost);
    expect(toastService.info).toHaveBeenCalledWith('Enter Post Content');
  });

  it('should create new post', () => {
    const mockResponse = {
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
    const mockPost = {
      content: 'string',
      postPhoto: 'string',
      email: 'string',
    };

    spyOn(postService, 'addPost').and.returnValue(of(mockResponse));
    spyOn(toastService, 'success');

    component.addNewPost(mockPost);

    expect(postService.addPost).toHaveBeenCalledWith(mockPost);
    expect(toastService.success).toHaveBeenCalledWith(
      'Successfully Created Post👌',
      {
        position: 'top-right',
      }
    );
  });

  it('error creating the post', () => {
    const mockPost = {
      content: 'string',
      postPhoto: 'string',
      email: 'string',
    };
    spyOn(postService, 'addPost').and.returnValue(
      throwError('Error creating post')
    );
    spyOn(toastService, 'warning');

    component.addNewPost(mockPost);

    expect(postService.addPost).toHaveBeenCalledWith(mockPost);
    expect(toastService.warning).toHaveBeenCalledWith(
      'Could not able to create post☹️',
      {
        position: 'top-right',
      }
    );
  });

  it('should toggle the modal', () => {
    component.toggleModal();
    expect(component.showModal).toBeFalse();

    component.toggleModal();
    expect(component.showModal).toBeTrue();
  });

  it('should toggle the profile dropdown', () => {
    component.dropdownProfile();
    expect(component.showDropdown).toBeFalse();

    component.dropdownProfile();
    expect(component.showDropdown).toBeTrue();
  });

  it('should search for user', () => {
    const mockSearch = {
      search: 'aman',
    };
    const results = [
      {
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
      },
      {
        id: 2,
        name: 'aman User',
        email: 'test1@test.com',
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
      },
    ];
    spyOn(userService, 'searchUser').and.returnValue(of(results));
    component.handleSearch(mockSearch);

    expect(userService.searchUser).toHaveBeenCalledWith(mockSearch.search);
    expect(component.searchResults).toEqual(results);
  });

  it('should logout properly', () => {
    localStorage.setItem('currentUser', 'test');
    spyOn(router, 'navigate');
    spyOn(toastService, 'success');

    component.handleLogout();

    expect(localStorage.getItem('currentUser')).toBeNull();
    expect(toastService.success).toHaveBeenCalledWith('Logout Successfull 😊', {
      position: 'top-right',
    });
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });
  it('should hide result', () => {
    component.hideResult();
    expect(component.searchResults).toEqual([]);
  });
  it('should navigate to profile on click', () => {
    const id = 1;
    const navigateSpy = spyOn(router, 'navigate');

    component.handleProfileRoute(id);

    expect(navigateSpy).toHaveBeenCalledWith(['feed/profile', id]);
  });
});
