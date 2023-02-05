import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { userReg } from 'src/app/model/regUser.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }

  addUser(user : userReg){
    return this.http.post<userReg>("http://localhost:3000/user",user);
  }
  getUsers(){
    return this.http.get<userReg[]>("http://localhost:3000/user");
  }
}
