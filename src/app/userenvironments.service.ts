import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import {Observable} from 'rxjs'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserenvironmentsService {
  

  constructor(private http: HttpClient, private route: Router) {
    
   }

   
   ENVAPIURL = "https://insurance-api01.suvamglobal.com/master/getuserenvironments"
   AUTHAPIURL = "https://insurance-api01.suvamglobal.com/master/authenticate" 
   



   callService(val:string): Observable<any>{
    return this.http.get("https://insurance-api01.suvamglobal.com/master/serverstatus") 
   }

   envData(d:string): Observable<any> {
    // const httpHeaders = new HttpHeaders();
    // httpHeaders.append('Content-Type', 'application/json');

    console.log("service component: "+d)
    var body = {
      "UserNameOrEmail": d
    }
    return this.http.post(this.ENVAPIURL, body)
   }

   authUser(user:string):Observable<any> {
    console.log("Authenticate user form data in service: ", user)
    return this.http.post(this.AUTHAPIURL, user)
   }

   store(token:any){
      localStorage.setItem('Token', token)
      return token;
   }

  //  logout(){
  //   localStorage.removeItem('Token')
  //   this.route.navigate([''])
  // }

  isLoggedIn(){
    if(localStorage.getItem('Token') != null){
      return true;
    }
    return false;
  }


}
