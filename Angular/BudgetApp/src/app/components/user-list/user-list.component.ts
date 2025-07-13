import {Component, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserService} from '../../services/user/user.service';
import {catchError} from 'rxjs';
import {User} from '../../model/user.type';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  users = signal<Array<User>>([])

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this.userService.getUsersList()
      .pipe(
        catchError(err => {
          console.log(err);
          throw err;
        })
        ).subscribe(data => {
      this.users.set(data);
    });
  }
}
