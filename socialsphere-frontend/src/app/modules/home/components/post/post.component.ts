import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Post } from 'src/app/model/Post';
import { User } from 'src/app/model/User';
import { PostService } from 'src/app/service/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { NgForm } from '@angular/forms';
import { CommentReq } from 'src/app/model/CommentReq';
import { FeedComponent } from '../feed/feed.component';
import { Comment } from 'src/app/model/Comment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent {
  [x: string]: any;
  @Input() post?: Post | null;
  @Input() currentUser?: User | null;

  loggedUser?: User;

  showComments = false;
  comment?: Comment;
  comments: Comment[] = [];
  commentReq: CommentReq = {
    email: '',
    content: '',
  };
  component: any;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private toastService: HotToastService
  ) {}
  ngOnInit() {
    this.initPostLikeSubscription();
    this.initPostUnlikeSubscription();
    this.getComment();
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.loggedUser = JSON.parse(storedUser);
    }
  }
  toggleLike() {
    if (this.loggedUser?.id != undefined) {
      if (this.post?.likedUserIds?.includes(this.loggedUser.id.toString())) {
        console.log('unlike');
        this.handleUnLike();
      } else {
        console.log('like');
        this.handleLike();
      }
    }
  }
  handleLike(): Post | null {
    this.postService
      .like(this.post?.id, this.loggedUser?.id)
      .subscribe((post) => {
        // this.postService.postAdded.next(true);
        this.post = post;
      });
    return this.post ? this.post : null;
  }
  handleUnLike(): Post | null {
    this.postService
      .unlike(this.post?.id, this.loggedUser?.id)
      .subscribe((post) => {
        // this.postService.postAdded.next(true);
        this.post = post;
      });
    return this.post ? this.post : null;
  }
  public initPostLikeSubscription() {
    this.postService.handleLike.subscribe((data: boolean) => {
      if (data) {
        this.post = this.handleLike();
      }
    });
  }
  public initPostUnlikeSubscription() {
    this.postService.handleUnlike.subscribe((data: boolean) => {
      if (data) {
        this.post = this.handleUnLike();
      }
    });
  }
  isCurrentRoute() {
    if (this.route.snapshot.routeConfig) {
      return this.route.snapshot.routeConfig.path === 'profile';
    }
    return false;
  }
  deletePost(postId: any) {
    this.postService.deletePost(postId).subscribe(
      (response) => {
        this.postService.postAdded.next(true);
        this.toastService.success('Delete Success', {
          position: 'top-right',
        });
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }
  handleComment(commentForm: any) {
    this.commentReq.content = commentForm.content;
    if (this.loggedUser?.email) {
      this.commentReq.email = this.loggedUser.email;
    }
    this.postService.addComment(this.post?.id, this.commentReq).subscribe(
      (data) => {
        this.comments.unshift(data);
        // commentForm.resetForm();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }
  getComment() {
    this.postService.getComments(this.post?.id).subscribe(
      (data) => {
        this.comments = data;
        this.comments.reverse();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }
  toggleComments() {
    this.showComments = !this.showComments;
  }
}
