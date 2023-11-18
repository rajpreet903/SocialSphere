import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { User } from 'src/app/model/User';
import { PostService } from 'src/app/service/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() currentUser?: User | null;
  searchResults: User[] = [];
  showResults = false;
  showModal = true;
  showDropdown = true;

  constructor(
    private postService: PostService,
    private toastService: HotToastService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}
  ngOnInit() {}
  toggleModal() {
    this.showModal = !this.showModal;
  }
  dropdownProfile() {
    this.showDropdown = !this.showDropdown;
  }
  handleLogout() {
    localStorage.removeItem('currentUser');
    this.toastService.success('Logout Successfull 😊', {
      position: 'top-right',
    });
    this.router.navigate(['login']);
  }
  addNewPost(postForm: any): void {
    postForm.email = this.currentUser?.email;
    if (postForm.content != '') {
      this.postService.addPost(postForm).subscribe(
        (post) => {
          //
          this.postService.postAdded.next(true);
          this.toastService.success('Successfully Created Post👌', {
            position: 'top-right',
          });
          // this.feed.getAllPost();
        },
        (error) => {
          this.toastService.warning('Could not able to create post☹️', {
            position: 'top-right',
          });
          console.log(error.message);
        }
      );
    } else {
      this.toastService.info('Enter Post Content');
    }
  }
  toggleMenu() {
    const postModal = document.getElementById('mobile-menu');
    postModal?.classList.toggle('hidden');
  }
  isCurrentRoute() {
    let profile = this.route.snapshot.routeConfig!.path === 'profile';
    let searchProfile = this.route.snapshot.routeConfig!.path === 'profile/:id';
    return profile || searchProfile;
  }
  handleSearch(searchQuery: any) {
    this.userService.searchUser(searchQuery.search).subscribe(
      (response) => {
        this.searchResults = response;
        console.log(this.searchResults);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }
  hideResult() {
    this.searchResults = [];
  }
  handleProfileRoute(id: any) {
    this.router.navigate(['feed/profile', id]);
  }
}
