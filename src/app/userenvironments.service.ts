import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UserenvironmentsService {
  

  constructor(private http: HttpClient) {
    
   }

   
   ENVAPIURL = "https://api.insurance.rahulmitra.dev/master/getuserenvironments"
   AUTHAPIURL = "https://api.insurance.rahulmitra.dev/master/authenticate" 
   



   callService(val:string): Observable<any>{
    return this.http.get("https://api.insurance.rahulmitra.dev/master/serverstatus") 
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


}
