import { HttpErrorResponse } from '@angular/common/http';
import { Component, ContentChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { flatMap } from 'rxjs';
import { UserenvironmentsService } from '../userenvironments.service';


export interface USERENV{
    "organizationEnvironmentId": number,
    "organizationEnvironmentName": string
}

export interface AUTHUSER{
    "UserNameOrEmail": string,
    "Password":string,
    "EnvironmentID":number
}
  
    



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
    public error: any;
    envId: any;
    inputData!: string;
    visible: boolean = true;
    changeType: boolean = true;
    inputdata!: any;
    inputenv: boolean = false;
    data: USERENV[] = [];
   

    inputsForm!:FormGroup;

    constructor(private fb:FormBuilder, private userEnvironments: UserenvironmentsService,  private route: Router){}
  
    ngOnInit(): void {
      
      this.inputsForm=this.fb.group({
        UserNameOrEmail: ['', [ Validators.required,
                                Validators.minLength(2),
                                Validators.maxLength(35)
                                // Validators.pattern("^[a-z][A-Z]{0,30}$"),
                                // Validators.email
                         ]],
        Password: ['', [ Validators.required,
                        //  Validators.pattern("^[A-Z][a-z][0-9][#?!@$%^&*-]{8}$"),
                         Validators.minLength(6)
                         ]],
        EnvironmentID: ['', Validators.required]
                    
      });
  
    }

    
    save(){
      console.log("form: ", this.inputsForm.value)
      for(var i=0;i<this.data.length;i++){
        if(this.data[i].organizationEnvironmentName == this.inputsForm.value.EnvironmentID)
        {
          this.inputsForm.value.EnvironmentID = this.data[i].organizationEnvironmentId
          break;
        }
      }
      return this.userEnvironments.authUser(this.inputsForm.value).subscribe(response => {
        this.data = response;
        console.log("form data in login component: ", this.data)
        console.log("response:", response.token)
        var tokenValue = this.userEnvironments.store(response.token)
        if(tokenValue!=null){
          this.route.navigate(['dashboard'])
        }
        else
          console.log("details couldn't find")
        // localStorage.setItem('Token', response.token)
      },
      (error: HttpErrorResponse)=>{
        this.error = (error.error.message);
      }
      )
     
    }
    onKeyUp(event:any){
      this.inputenv = false;
      this.error="";
      console.log("Name or email: " +event.target.value)
      console.log("before calling api: " +this.inputsForm.value.UserNameOrEmail)
      if(this.inputsForm.value.UserNameOrEmail!=this.inputData.length){
        this.userEnvironments.envData(this.inputsForm.value.UserNameOrEmail).subscribe(response => {
          this.data=response;
          console.log("login component: ", this.data) 
          this.inputenv = true;
          return
        },
        (error: HttpErrorResponse) => {
          this.error = (error.error.message);
          console.log("error message: ", this.error)
        }); 
      }
    }

    clear(){
      this.inputData = '';
    }
    
    viewpass(){
      this.visible = !this.visible;
      this.changeType = !this.changeType
    }

}

