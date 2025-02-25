import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './components/header/header.component';
import {UserListComponent} from './components/user-list/user-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, UserListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BudgetApp';
}
