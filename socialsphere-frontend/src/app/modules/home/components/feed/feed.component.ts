import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Post } from 'src/app/model/Post';
import { User } from 'src/app/model/User';
import { PostService } from 'src/app/service/post.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent {
  currentUser?: User | null;
  posts?: Post[];

  constructor(
    private userService: UserService,
    private postService: PostService
  ) {}
  ngOnInit() {
    this.storeUserData();
    this.getAllPost();
    this.initPostAddedSubscription();
  }
  //store User data
  storeUserData() {
    this.userService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
      this.currentUser ? (this.currentUser.authUser = true) : null;
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
    });
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    }
  }
  //Post Data
  getAllPost(): Post[] {
    this.postService.getPostByAuthorId(this.currentUser?.id).subscribe(
      (data) => {
        this.posts = data;
        this.posts.reverse();
        console.log('GOT all Posts');
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
        this.posts = this.getAllPost();
      }
    });
  }
}
