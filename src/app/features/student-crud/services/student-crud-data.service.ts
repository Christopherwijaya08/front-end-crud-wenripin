import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Response } from 'src/shared/models/response.model';
import { StudentModel, studentPagingModel } from '../models/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentCrudDataService {
  public onDataTables: BehaviorSubject<any> = new BehaviorSubject([]);
  public pagingModel: studentPagingModel = new studentPagingModel();
  public recordsTotal: number;

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

  get studentData$(): Observable<StudentModel[]> {
    return this.onDataTables.asObservable();
  }

  //POST
  SaveData(data: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this._http.post<any>('http://localhost:8000/user/create', data).subscribe(
        (res) => {
          // On successful response, resolve the promise
          resolve(res);
        },
        (err: any) => {
          // On error, reject the promise with the error
          reject(err.error.message);
        }
      );
    });
  }

  //GET
  GetData(): Promise<StudentModel> {
    return new Promise((resolve, reject) => {
      this._http.get<any>(`http://localhost:8000/user/getAll${this.toQueryString(this.pagingModel)}`).subscribe(
        (res) => {
          resolve(res);
          this.onDataTables.next(res.data);
          this.recordsTotal = res.recordsTotal;
          console.log(this.pagingModel);
        },
        (err: any) => {
          reject(err);
        }
      );
    });
  }

  GetDataById(id: string): Promise<StudentModel> {
    return new Promise((resolve, reject) => {
      this._http
        .get<any>(`http://localhost:8000/user/getDataById/${id}`)
        .subscribe(
          (res) => {
            resolve(res.data);
          },
          (err: any) => {
            reject(err);
          }
        );
    });
  }

  //PUT
  UpdateData(data: StudentModel): Promise<Response> {
    return new Promise((resolve, reject) => {
      this._http
        .patch<any>(`http://localhost:8000/user/update/${data._id}`, data)
        .subscribe(
          (res) => {
            console.log(res);
            resolve(res);
          },
          (err) => {
            reject(err.error.message);
          }
        );
    });
  }
  //DELETE
  DeleteData(_id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.delete(`http://localhost:8000/user/remove/${_id}`).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}
