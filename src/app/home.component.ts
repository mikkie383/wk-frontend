import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from './emitters/emitters';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./app.component.css']
})
export class HomeComponent implements OnInit{
  message = '';
  reports:any = [];
  constructor(private http : HttpClient){}
  
  ngOnInit(): void{
    this.http.get('http://localhost:2233/api/user/one', {withCredentials: true}).subscribe((res: any) => {
      this.message = `Welcome home. ${res.firstName}!`;
      Emitters.outhEmitter.emit(true);
    }, err =>{
      this.message = 'This is home';
      Emitters.outhEmitter.emit(false);
    });

    this.http.get('http://localhost:2233/api/user/names').subscribe((data)=>{
      console.log(data);
      this.reports = data;
    });
  }
}