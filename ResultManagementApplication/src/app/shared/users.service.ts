import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  public _subject = new BehaviorSubject<any>('');

  emit<T>(data: T) {
    this._subject.next(data);
  }

  on<T>(): Observable<T> {
    return this._subject.asObservable();
  }

  getUser() {
    return this.http.get("http://localhost:3000/posts");
  }
  postUser(data: any) {
    return this.http.post("http://localhost:3000/posts", data);
  }
  updateUser(data: any, id: number) {
    return this.http.put("http://localhost:3000/posts/" + id, data);
  }
  deleteUser(id: number) {
    return this.http.delete("http://localhost:3000/posts/" + id);
  }
  getCurrentData(id: number) {
    return this.http.get("http://localhost:3000/posts/" + id)
    .pipe(map((res: any) => {
      return res;
    }))
  }
}
