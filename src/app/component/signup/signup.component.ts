import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  message = '';
  form = this.fb.group(
    {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, emailValid()]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: matchingFields}
  );
  constructor(private fb: FormBuilder, private router : Router, private http:HttpClient) {
    // this.form = fb.group({
    //   firstName: ['', Validators.required],
    //   lastName: ['', Validators.required],
    //   email: ['', [Validators.required, emailValid()]],
    //   password: ['', Validators.required],
    //   confirmPassword: ['', Validators.required]
    // }, { validator: matchingFields('password', 'confirmPassword')})
   }


   onSubmit(){
    console.log(this.form.errors)
    //this.auth.signup(this.form.value);
    delete this.form.value.confirmPassword;
    this.http.post('http://localhost:2233/api/user', this.form.value).subscribe(
          (res:any) => {
            if(res.success){this.router.navigate(['login'])}
            this.message = res.message;
          }
      );
  }

  isValid(control:any){
    return this.form.controls[control].invalid && this.form.controls[control].touched
  }


  ngOnInit(): void {
    // this.form = this.fb.group({
    //   firstName: ['', Validators.required],
    //   lastName: ['', Validators.required],
    //   email: ['', [Validators.required, emailValid()]],
    //   password: ['', Validators.required],
    //   confirmPassword: ['', Validators.required]
    // }
    // );
  }

}

// function matchingFields(field1:any, field2:any){
//   return form =>{
//     if(form.controls[field1].value !== form.controls[field2].value)
//       return { mismatchedFields: true}
//   }
// }
const matchingFields: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password?.value !== confirmPassword?.value ? {mismatchedFields: true}: null; 
}

function emailValid() {
      return (control: { value: string; }) => {
      var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

       return regex.test(control.value) ? null : { invalidEmail : true}
     }
}