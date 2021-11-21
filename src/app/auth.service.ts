import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
    BASE_URL = 'http://localhost:2233';
    constructor(private http : HttpClient, private router : Router) {}

    signup(user:any){
        delete user.confirmPassword;
        this.http.post(this.BASE_URL + '/api/user', user).subscribe(
            () => {
                this.router.navigate(['login'])
            }
        );
    }

    // login(loginData: () => any){
    //     this.http.post(this.BASE_URL + '/api/user/login', loginData, {withCredentials: true}).subscribe(
    //         res => {
    //             this.router.navigate(['/']);
    //             console.log(res);
    //         }
    //     );
    // }
    
}