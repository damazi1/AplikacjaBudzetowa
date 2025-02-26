import {Component, OnInit} from '@angular/core';
import {User} from '../../classes/user/user';
import {CommonModule} from '@angular/common';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this.userService.getUsersList().subscribe(data => {
      this.users = data;
    });
  }
}
