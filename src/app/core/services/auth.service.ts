import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private storageService: StorageService) {}

  login(username: string, password: string): Observable<User> {
    return this.http.post<User>('http://localhost:3000/login', { username, password });
  }

  async persistUser(user: User) {
    await this.storageService.set('user', user);
  }

  async getPersistedUser(): Promise<User | null> {
    return await this.storageService.get('user');
  }

  async logout() {
    await this.storageService.remove('user');
  }
}
