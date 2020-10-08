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
  this.sampleService.create(Math.random()*1000000).subscribe();
}
  ngOnInit(): void {
  }



}







