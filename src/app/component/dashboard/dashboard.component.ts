import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  reports:any = [];
  authenticated = false;
  userId = "";
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:2233/api/user/one', {withCredentials: true}).subscribe((res: any) => {
      this.authenticated = true;
      this.userId = res._id;
      console.log(this.userId);
    });
    this.http.get('http://localhost:2233/api/report').subscribe((data)=>{
      console.log(data);
      this.reports = data;
    });
  }

  editReport(_id: any){

  }

  deleteReport(_id: any){
      return this.http.delete('http://localhost:2233/api/report/' + _id).subscribe();
    
  }

}
