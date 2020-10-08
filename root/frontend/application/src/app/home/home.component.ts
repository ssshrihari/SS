import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  public random;

  click(){
    this.random=Math.floor((Math.random()*1000000)+1);
  }

  ngOnInit(): void {
  }

 

}
