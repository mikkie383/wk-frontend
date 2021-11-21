import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from 'src/app/emitters/emitters';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  name = '';
  authenticated = false;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    Emitters.outhEmitter.subscribe((auth:boolean) =>{
      this.authenticated = auth;
      // this.http.get('http://localhost:2233/api/user/one', {withCredentials: true}).subscribe((res: any) => {
      // this.name = res.firstName;
      // });
    });

    this.http.get('http://localhost:2233/api/user/one', {withCredentials: true}).subscribe((res: any) => {
      this.authenticated = true;
      this.name = res.firstName;
    }, err =>{
      this.authenticated = false;
      this.name = '';
    });
    
  }

  logout(): void{
    this.http.post('http://localhost:2233/api/user/logout', {}, {withCredentials:true}).subscribe(()=>{
    this.authenticated = false;
    });
  }

}
