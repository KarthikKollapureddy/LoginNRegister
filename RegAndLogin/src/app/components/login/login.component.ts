import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlDirective, FormGroup, Validators } from '@angular/forms';
import { userLogin } from 'src/app/model/loginUser.model';
import { userReg } from 'src/app/model/regUser.model';
import { RegisterService } from 'src/service/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pass: string | undefined;
  show = false;

  constructor(private regService:RegisterService) {
    this.noUser =false
    this.pass='password'}
  userL:userReg[]=[]
  noUser:boolean=false
  count = 0
  user = new userReg()
  form!:FormGroup
  ngOnInit(): void {

    this.form = new FormGroup(
      {
        email:new FormControl(this.user.email,[
          Validators.email,
          Validators.required
        ]),
        password:new FormControl(this.user.password,[
          Validators.required,
          Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@$%^&)(}{][:;<>,.?/~_+-=|]).{8,32}$')

        ])
      }
    )
  }

  onClick() {
    if (this.pass === 'password') {
      this.pass = 'text';
      this.show = true;
    } else {
      this.pass = 'password';
      this.show = false;
    }
  }

  get email() { return this.form.get('email')!; }
  get password() { return this.form.get('password')!; }

  onSubmit(){
    this.regService.getUsers().subscribe(
      data=>{
        this.userL = data;
        for(let i = 0;i<this.userL.length;i++){
          if((this.user.email == this.userL[i].email) && (this.user.password==this.userL[i].password)){
            alert("login sucess");
            this.count = 1
            console.table(this.userL[i]);
          }
        }
        if(this.count == 0){
          console.log(this.count);

          this.noUser=true}
          else{
            this.count = 0
            console.log(this.count);

            this.noUser=false
          }
        // alert("no user found");



      },
      error=>{
        console.error(error);

      }
    )
  }

}
