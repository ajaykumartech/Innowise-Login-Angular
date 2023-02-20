import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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
    data: USERENV[] = [];


    inputsForm!:FormGroup;

    constructor(private fb:FormBuilder, private userEnvironments: UserenvironmentsService){}
  
    ngOnInit(): void {
  
      this.inputsForm=this.fb.group({
        UserNameOrEmail: ['', [ Validators.required,
                         Validators.pattern("^[A-Z][a-z]{0,30}$"),
                        //  Validators.email
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
      },
      (error: HttpErrorResponse)=>{
        this.error = (error.error.message);
      }
      )
     
    }
    onKeyUp(event:any){
      this.error="";
      console.log("Name or email: " +event.target.value)
      
      // this.inputsForm.value.username = new FormControl('', { validators: [Validators.required]})
      console.log("before calling api: " +this.inputsForm.value.UserNameOrEmail)
      return this.userEnvironments.envData(this.inputsForm.value.UserNameOrEmail).subscribe(response => {
        this.data=response;
        console.log("login component: ", this.data) 
      },
      (error: HttpErrorResponse) => {
        this.error = (error.error.message);
        console.log("error message: ", this.error)
      }); 
    }

    clear(){
      this.inputData = '';
    }

}

