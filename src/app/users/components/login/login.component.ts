import { Component, OnInit } from '@angular/core';
import {IUser} from "../../models/IUser";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: IUser = {
    name: '',
    email: '',
    password: ''
  }
  public message: string;
  public errorMessage: string;
  public inputType: string = 'password'
  public isEmptyFormSubmitted: boolean;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  /**
   *  Login a User
   *
   * @param user
   */
  submitLoginForm(user: IUser){
    // If any of the field submitted blank
    if(user.email !== '' || user.password !== '') {
      this.isEmptyFormSubmitted = true
    }
    // All the fields are filled by user
    if(user.email !== '' && user.password !== '') {
      this.userService.login(user).subscribe((data) => {
          let token = data.token
          // Store the token in local storage and redirect to pro events page
          localStorage.setItem('token', token)
          localStorage.setItem('user', JSON.stringify(data.user))
          this.isEmptyFormSubmitted = false
          this.router.navigate(['/events/pro-events']).then(response => response)
          //this.router.parseUrl('/events/pro-events')
        },
        (error => {
          this.errorMessage = error
        }))
    }
    else{
      this.isEmptyFormSubmitted = true
    }
  }

  public showPassword(){
    (this.inputType === 'password') ? (this.inputType = 'text') : (this.inputType = 'password')

  //   if(this.inputType === 'password'){
  //     this.inputType = 'text'
  //   }
  //   else
  //     this.inputType = 'password'
  }
}
