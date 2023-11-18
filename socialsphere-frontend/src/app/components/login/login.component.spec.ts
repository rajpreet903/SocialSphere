import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { HotToastService } from '@ngneat/hot-toast';
import { of, throwError } from 'rxjs';
import { User } from 'src/app/model/User';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let routerSpy: jasmine.SpyObj<Router>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let toastServiceSpy: jasmine.SpyObj<HotToastService>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    userServiceSpy = jasmine.createSpyObj('UserService', [
      'checkUser',
      'setCurrentUser',
    ]);
    toastServiceSpy = jasmine.createSpyObj('HotToastService', [
      'success',
      'error',
    ]);

    component = new LoginComponent(routerSpy, userServiceSpy, toastServiceSpy);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to signup page on signup click', () => {
    component.onSignUpClick();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['signup']);
  });

  it('should login user on submit', () => {
    const mockLogin = { email: 'test@test.com', password: 'test' };
    userServiceSpy.checkUser.and.returnValue(
      of({
        id: 1,
        name: 'Test User',
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
      } as User)
    );

    component.onSubmit(mockLogin);

    expect(userServiceSpy.checkUser).toHaveBeenCalledWith(mockLogin);
    expect(userServiceSpy.setCurrentUser).toHaveBeenCalled();
    expect(toastServiceSpy.success).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/feed']);
  });

  it('should handle login error', () => {
    const mockLogin = { email: 'test@test.com', password: 'test' };
    userServiceSpy.checkUser.and.returnValue(throwError({ status: 401 }));

    component.onSubmit(mockLogin);

    expect(userServiceSpy.checkUser).toHaveBeenCalledWith(mockLogin);
    expect(toastServiceSpy.error).toHaveBeenCalled();
    expect(component.unauthorized).toBeTrue();
  });
});
