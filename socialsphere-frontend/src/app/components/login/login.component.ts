import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private router: Router,
    private userservice: UserService,
    private toastService: HotToastService
  ) {}
  //logged user details
  public loggedUser!: User;
  public loginForm!: FormGroup;
  public unauthorized: boolean = false;

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  public onSignUpClick() {
    this.router.navigate(['signup']);
  }

  public onSubmit(checklogin: any) {
    console.log(checklogin);

    this.userservice.checkUser(checklogin).subscribe(
      (response) => {
        this.loggedUser = response;
        this.userservice.setCurrentUser(response);
        this.toastService.success('Login Successfull 😍', {
          position: 'top-right',
        });
        this.router.navigate(['/feed']);
      },
      (error: HttpErrorResponse) => {
        this.toastService.error('Could not Login☹️', {
          position: 'top-right',
        });
        this.unauthorized = true;
      }
    );
  }
}
