import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Emitters } from 'src/app/emitters/emitters';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {

  message ='';
  userId = '';
  authenticated = false;
  
  constructor(private http:HttpClient, private fb : FormBuilder, private router : Router) { }

  
  ngOnInit(): void {
    this.http.get('http://localhost:2233/api/user/one', {withCredentials: true}).subscribe((res: any) => {
      this.authenticated = true;
      this.userId = res._id;
      console.log(this.userId);
    }, err =>{
      this.authenticated = false;
    })
  }
  form = this.fb.group(
    {
      userId: [this.userId, Validators.required],
      workoutToday: ['', Validators.required],
      explanation: ['', [Validators.required]]
    }
  );

  onSubmit(){
    console.log(this.form.errors)
    this.http.post('http://localhost:2233/api/report', this.form.value).subscribe(
          (res:any) => {
            if(res.success){this.router.navigate(['dashboard'])}
            console.log(res);
          }
      );
  }

}
