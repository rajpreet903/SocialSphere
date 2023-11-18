import { SignupComponent } from './signup.component';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { HotToastService } from '@ngneat/hot-toast';
import { User } from 'src/app/model/User';
import { of, throwError } from 'rxjs';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let routerSpy: jasmine.SpyObj<Router>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let toastServiceSpy: jasmine.SpyObj<HotToastService>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    userServiceSpy = jasmine.createSpyObj('UserService', ['addUser']);
    toastServiceSpy = jasmine.createSpyObj('HotToastService', [
      'success',
      'error',
      'warning',
    ]);

    component = new SignupComponent(routerSpy, userServiceSpy, toastServiceSpy);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not do anything if input is empty', () => {
    const mockSignupForm = {
      name: '',
      email: '',
      password: '',
      gender: '',
      profilePhoto: '',
      coverPhoto: '',
      bio: '',
    };
    component.signupUser(mockSignupForm);
    expect(toastServiceSpy.warning).toHaveBeenCalled();
  });

  it('should signup user on submit', () => {
    const mockSignupForm = {
      name: 'aman',
      email: 'aman@aman.com',
      password: 'aman',
      gender: 'male',
      profilePhoto: 'string',
      coverPhoto: 'string',
      bio: 'string',
    };

    userServiceSpy.addUser.and.returnValue(
      of({
        id: 1,
        name: 'aman',
        email: 'aman@aman.com',
        password: 'aman',
        profilePhotoUrl: '',
        coverPhotoUrl: '',
        gender: '',
        bio: '',
        followerCount: 0,
        followingCount: 0,
        createdAt: '',
        updatedAt: '',
        authUser: false,
      } as User)
    );
    console.log(mockSignupForm);

    component.signupUser(mockSignupForm);
    expect(userServiceSpy.addUser).toHaveBeenCalledWith(mockSignupForm);
    expect(toastServiceSpy.success).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should handle error if signup failed', () => {
    const mockSignupForm = {
      name: 'aman',
      email: 'aman@aman.com',
      password: 'aman',
      gender: 'male',
      profilePhoto: 'string',
      coverPhoto: 'string',
      bio: 'string',
    };

    userServiceSpy.addUser.and.returnValue(throwError({ statuscode: 500 }));
    component.signupUser(mockSignupForm);

    expect(userServiceSpy.addUser).toHaveBeenCalledWith(mockSignupForm);
    expect(toastServiceSpy.error).toHaveBeenCalled();
  });
});
