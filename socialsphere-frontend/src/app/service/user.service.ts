import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/User';
import { Signup } from '../model/Signup';
import { Login } from '../model/Login';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private signedInUser = new BehaviorSubject<User | null>(null);

  apiBaseUrl = 'http://localhost:2020';
  constructor(private httpClient: HttpClient) {}

  addUser(signup: Signup): Observable<User> {
    return this.httpClient.post<User>(`${this.apiBaseUrl}/api/signup`, signup);
  }
  checkUser(login: Login): Observable<User> {
    return this.httpClient.post<User>(`${this.apiBaseUrl}/api/login`, login);
  }
  getCurrentUser(): Observable<User | null> {
    return this.signedInUser.asObservable();
  }
  setCurrentUser(user: User | null) {
    this.signedInUser.next(user);
  }
  updateUser(user: User, id: number): Observable<User> {
    return this.httpClient.put<User>(
      `${this.apiBaseUrl}/api/user/${id}/update`,
      user
    );
  }
  searchUser(searchQuery: string): Observable<User[]> {
    const reqParams = new HttpParams().set('query', searchQuery);
    return this.httpClient.get<User[]>(`${this.apiBaseUrl}/api/user/search`, {
      params: reqParams,
    });
  }
  getUserById(id: any): Observable<User> {
    return this.httpClient.get<User>(`${this.apiBaseUrl}/api/user/${id}`);
  }
}
