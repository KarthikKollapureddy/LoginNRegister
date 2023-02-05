import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { userReg } from 'src/app/model/regUser.model';
import { RegisterService } from 'src/service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  pass: string | undefined;
  show = false;

  constructor(private regService:RegisterService) { }
  form !: FormGroup;
  User = new userReg();
  count = 0
  valid = false
  ngOnInit(): void {
    this.valid = false
    this.count=0
    this.pass='password'
      this.form = new FormGroup({
      firstname : new FormControl(this.User.firstname,[
        Validators.minLength(4),
        Validators.maxLength(18),
        Validators.required
      ]),
      lastname : new FormControl(this.User.lastname,[
        Validators.minLength(4),
        Validators.maxLength(18),
        Validators.required
      ]),
      email : new FormControl(this.User.email,[
        Validators.email,
        Validators.required,
      ]),
      password : new FormControl(this.User.password,[
        Validators.required,
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@$%^&)(}{][:;<>,.?/~_+-=|]).{8,32}$')
      ]),

  })
  }

  // myValidators(){
  //   this.form.controls["firstname"].setValidators([Validators.required,Validators.minLength(4)]);
  //   this.form.controls["email"].setValidators([Validators.email])
  // }

  get firstname() { return this.form.get('firstname')!; }
  get lastname() { return this.form.get('lastname')!; }
  get email() { return this.form.get('email')!; }
  get password() { return this.form.get('password')!; }


  onClick() {
    if (this.pass === 'password') {
      this.pass = 'text';
      this.show = true;
    } else {
      this.pass = 'password';
      this.show = false;
    }
  }
  userL:userReg[]=[]



  onSubmit(){

    this.regService.getUsers().subscribe(
      data=>{
        this.userL = data;
        for(let i = 0;i<this.userL.length;i++){
          if(this.userL[i].email == this.User.email){
            console.log(this.userL[i].email == this.User.email);
              this.count = 1
              console.log(this.count);

          }
        }
      },error=>{
        console.log(error);

      }

    )
    if(this.count == 0){
      console.log(this.count);

       this.regService.addUser(this.User).subscribe(
      data=>{
        alert("user added succesfully.")
        console.table(data);

      },
      error=>{
        console.log(error);

      }
    )
    }
    else{
      this.valid= true;
      alert("user with email alredy exits")
    }


    // this.regService.addUser(this.User).subscribe(
    //   data=>{
    //     alert("user added succesfully.")
    //     console.table(data);

    //   },
    //   error=>{
    //     console.log(error);

    //   }
    // )
  }
}
