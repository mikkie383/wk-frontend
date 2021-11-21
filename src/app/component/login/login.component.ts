import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message = '';
  form:FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });;
  constructor(private fb : FormBuilder, private router : Router, private http: HttpClient) { }

  ngOnInit(): void {
  }


  login(): void{
    // console.log(this.form.errors);
    //this.auth.login(this.form.getRawValue());
    this.http.post('http://localhost:2233/api/user/login', this.form.getRawValue(), {withCredentials: true}).subscribe(
      (res:any) => {
        if(res.success){
          this.router.navigate(['/']);
        }
        this.message = res.message;
        console.log(res);
      }
  );
  }
}
