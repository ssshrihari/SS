import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  user: User = new User();
  submitted = false;
  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
  }

  login(){
    

    this.userService.signin(this.user)
      .subscribe(data=>{
        console.log(data);
        var status=JSON.stringify(data);
        console.log(status);
        var keys=Object.keys(status);
        console.log(keys);
        this.router.navigate(['/dashboard']);
     
        }
      )
  }

}
