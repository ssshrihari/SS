import { Component, OnInit } from '@angular/core';
import { SampleService } from 'src/app/services/sample.service'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

constructor(private sampleService:SampleService){}
public random;
submitted = false;

click(){
const data={};

  this.sampleService.create(data)
       .subscribe(
         response =>{
         console.log(response);
         this.random=Math.floor((Math.random()*1000000)+1);
         console.log(this.random);
         this.submitted=true;
        },
        error => {
          console.log(error);
        });
}


  ngOnInit(): void {
  }



}







