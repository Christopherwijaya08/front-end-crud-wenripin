import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterModel } from '../models/register.model';
import { NotesModel } from '../../home/models/notes.model';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private _http: HttpClient) {}

  toQueryString = (obj: any) =>
    '?'.concat(
      Object.keys(obj)
        .map((e) =>
          obj[e] ? `${encodeURIComponent(e)}=${encodeURIComponent(obj[e])}` : ''
        )
        .filter((x) => x !== '')
        .join('&')
    );

  Register(data: RegisterModel): Promise<void> {
    return new Promise((resolve, reject) => {
      this._http
        .post<any>('http://127.0.0.1:8000/api/register', data)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err: any) => reject(err)
        );
    });
  }

  Login(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.post<any>('http://127.0.0.1:8000/api/login', data).subscribe(
        (res) => {
          resolve(res);
        },
        (err: any) => reject(err)
      );
    });
  }

  GetDetailOfUser(token: string): Promise<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return new Promise((resolve, reject) => {
      this._http
        .get<any>('http://127.0.0.1:8000/api/userDetailByToken', { headers })
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err: any) => reject(err)
        );
    });
  }

  logout(logout_time: string, token: string): Promise<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return new Promise((resolve, reject) => {
      this._http
        .post<any>(
          'http://127.0.0.1:8000/api/logout',
          {
            logout_time: logout_time,
          },
          { headers }
        )
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err: any) => reject(err)
        );
    });
  }

  CreateNote(data: NotesModel, token: string): Promise<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return new Promise((resolve, reject) => {
      this._http
        .post<any>('http://127.0.0.1:8000/api/notes', data, { headers })
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err: any) => reject(err)
        );
    });
  }

  BrowseNote(token: string): Promise<NotesModel[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return new Promise((resolve, reject) => {
      this._http
        .get<any>('http://127.0.0.1:8000/api/notes', { headers })
        .subscribe(
          (res) => {
            resolve(res.data);
          },
          (err: any) => reject(err)
        );
    });
  }

  GetNoteById(id: number, token: string): Promise<NotesModel> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return new Promise((resolve, reject) => {
      this._http
        .get<any>(`http://127.0.0.1:8000/api/note/${id}`, { headers })
        .subscribe(
          (res) => {
            resolve(res.data);
          },
          (err: any) => reject(err)
        );
    });
  }

  UpdateNote(data: NotesModel, token: string): Promise<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return new Promise((resolve, reject) => {
      this._http
        .put<any>(`http://127.0.0.1:8000/api/notes/${data.id}`, data, {
          headers,
        })
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err: any) => reject(err)
        );
    });
  }

  DeleteNote(id: number, token: string): Promise<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return new Promise((resolve, reject) => {
      this._http
        .delete<any>(`http://127.0.0.1:8000/api/notes/${id}`, { headers })
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err: any) => {
            reject(err);
          }
        );
    });
  }
}
