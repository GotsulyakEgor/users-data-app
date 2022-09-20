import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  constructor(private http: HttpClient) {
  }

  getUsers() {
    return this.http.get("http://localhost:3000/users")
      .pipe(map((res: any) => {
        return res
      }))
  }

  addUser(data: any) {
    return this.http.post("http://localhost:3000/users", data)
      .pipe(map((res: any) => {
        return res
      }))
  }

  editUser(data: any, id: number) {
    return this.http.patch(`http://localhost:3000/users/${id}`, data)
      .pipe(map((res: any) => {
        return res
      }))
  }


  deleteUser(id: number) {
    return this.http.delete(`http://localhost:3000/users/${id}`)
      .pipe(map((res: any) => {
        return res
      }))
  }

}
