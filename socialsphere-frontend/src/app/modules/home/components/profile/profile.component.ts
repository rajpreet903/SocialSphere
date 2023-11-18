import { Component, Input, ViewChild } from '@angular/core';
import { User } from 'src/app/model/User';
import { PostService } from 'src/app/service/post.service';
import { Post } from 'src/app/model/Post';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  currentUser?: User;
  posts?: Post[];
  searchUser?: User;

  constructor(
    private postService: PostService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    }
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // check if route is /profile/:id
        const isProfileRoute = event.url.startsWith('/feed/profile/');

        if (!isProfileRoute) {
          // reset searchUser if navigating away from profile/:id
          this.searchUser = undefined;
          console.log(this.searchUser);
        }
      }
    });
  }
  ngOnInit() {
    this.getPosts();
    this.initPostAddedSubscription();
    this.route.paramMap.subscribe((param) => {
      let id = param.get('id');

      this.userService.getUserById(id).subscribe(
        (data) => {
          this.searchUser = data;
          this.posts = this.getPostsOfSearchUser();
          console.log(this.searchUser);
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      );
    });
  }
  updateUser(updateUser: any) {
    if (this.currentUser) {
      this.userService.updateUser(updateUser, this.currentUser.id).subscribe(
        (data) => {
          data.authUser = true;
          localStorage.setItem('currentUser', JSON.stringify(data));
          this.currentUser = data;
        },
        (error) => {
          console.log(error.message);
        }
      );
    }
  }
  getPosts() {
    this.postService.getPostByAuthorId(this.currentUser?.id).subscribe(
      (data) => {
        this.posts = data;
        this.posts.reverse();
      },
      (error: HttpErrorResponse) => {
        console.log('Post Error: ', error.message);
      }
    );
    return this.posts;
  }
  getPostsOfSearchUser() {
    this.postService.getPostByAuthorId(this.searchUser?.id).subscribe(
      (data) => {
        this.posts = data;
        this.posts.reverse();
      },
      (error: HttpErrorResponse) => {
        console.log('Post Error: ', error.message);
      }
    );

    return this.posts ? this.posts : [];
  }

  public initPostAddedSubscription() {
    this.postService.postAdded.subscribe((data: boolean) => {
      if (data) {
        this.posts = this.getPosts();
      }
    });
  }

  toggleModal() {
    const postModal = document.getElementById('userUpdateModal');
    postModal?.classList.toggle('hidden');
  }
}
