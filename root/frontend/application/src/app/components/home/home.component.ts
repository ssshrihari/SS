import { Component, OnInit } from '@angular/core';
import { SampleService } from 'src/app/services/sample.service'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  r={
    s:Math.floor(Math.random()*1000000),
    l:Math.random()*1000000,
    k:Math.random()*1000000
  };
  // p;
  
constructor(private sampleService:SampleService){}

click(){
  this.sampleService.create(JSON.stringify(this.r)).subscribe();
  // this.p=JSON.stringify(this.r);
  // console.log(this.p);
  // this.sampleService.post(this.p);
}
  ngOnInit(): void {
  }



}







