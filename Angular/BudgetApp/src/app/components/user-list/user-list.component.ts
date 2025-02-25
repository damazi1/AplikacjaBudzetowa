import {Component, OnInit} from '@angular/core';
import {User} from '../../classes/user/user';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  users: User[];

  constructor() {
  }

  ngOnInit() {
    this.users = [
      {id: '1', userName: 'user1'},
      {id: '2', userName: 'user2'},
      {id: '3', userName: 'user3'}
      ];
  }
}
