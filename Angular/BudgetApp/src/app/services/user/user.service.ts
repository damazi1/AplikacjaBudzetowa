import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../classes/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/list';
  constructor(private  httpClient: HttpClient) { }

  getUsersList(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.baseUrl}`);
  }
}
