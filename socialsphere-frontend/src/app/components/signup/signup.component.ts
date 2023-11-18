import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/service/user.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(
    private router: Router,
    private userService: UserService,
    private toastService: HotToastService
  ) {}
  public addedUser!: User;
  public emailUsed: boolean = false;

  ngOnInit() {}

  public signupUser(addForm: any): void {
    if (
      addForm.name !== '' &&
      addForm.email !== '' &&
      addForm.password !== ''
    ) {
      this.userService.addUser(addForm).subscribe(
        (response: User) => {
          this.addedUser = response;
          this.toastService.success('Account Created Successfully');
          this.router.navigate(['/login']);
        },
        (error: HttpErrorResponse) => {
          this.toastService.error('Failed to Create Account');
        }
      );
    } else {
      this.toastService.warning('Please enter the details');
    }
  }
}
