import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  // signinForm:FormGroup;
  // email:string="";
  // password:string="";

  user: User = new User();
  submitted = false;
  constructor(private userService: UserService, private router: Router) {
    // this.signinForm = formbuilder.group({
    //   email:['',[Validators.required,Validators.email]],
    //   password:['',[Validators.required,Validators.minLength(6)]]
    // });
   }

  ngOnInit(): void {
    
  }

  login() {


    this.userService.signin(this.user)

      .subscribe(data => {
        var status = JSON.parse(JSON.stringify(data));
        console.log(status);
        if (status.user == "ok") {
          this.router.navigate(['/dashboard']);
        } else {
          window.location.reload();
        }

      }
      )
  }

}
