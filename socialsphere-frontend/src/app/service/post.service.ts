import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Post } from '../model/Post';
import { HttpClient } from '@angular/common/http';
import { addPost } from '../model/addPost';
import { ObservableLoading } from '@ngneat/hot-toast';
import { CommentReq } from '../model/CommentReq';
import { Comment } from '../model/Comment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  // posts$ = new BehaviorSubject<Post | null>(null);

  apiBaseUrl = 'http://localhost:2020/api';
  public postAdded: Subject<boolean>;
  public handleLike: Subject<boolean>;
  public handleUnlike: Subject<boolean>;

  constructor(private http: HttpClient) {
    this.postAdded = new Subject<boolean>();
    this.handleLike = new Subject<boolean>();
    this.handleUnlike = new Subject<boolean>();
  }

  addPost(post: addPost): Observable<Post> {
    return this.http.post<Post>(`${this.apiBaseUrl}/addpost`, post);
    // .pipe(tap((addedPost) => this.posts$.next(addedPost)));
  }
  getPostByAuthorId(id: any): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiBaseUrl}/getallpost/${id}`);
  }
  like(postId: any, userId: any): Observable<Post> {
    return this.http.post<Post>(
      `${this.apiBaseUrl}/posts/${postId}/like`,
      userId
    );
  }
  unlike(postId: any, userId: any): Observable<Post> {
    return this.http.post<Post>(
      `${this.apiBaseUrl}/posts/${postId}/unlike`,
      userId
    );
  }
  deletePost(postId: any): Observable<any> {
    return this.http.delete<any>(`${this.apiBaseUrl}/post/delete/${postId}`);
  }
  addComment(postId: any, commentReq: CommentReq): Observable<Comment> {
    return this.http.post<Comment>(
      `${this.apiBaseUrl}/post/${postId}/comments/create`,
      commentReq
    );
  }
  getComments(postId: any): Observable<Comment[]> {
    return this.http.get<Comment[]>(
      `${this.apiBaseUrl}/post/${postId}/comments`
    );
  }
}
