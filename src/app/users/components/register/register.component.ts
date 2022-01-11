import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {IUser} from "../../models/IUser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public user: IUser = {
    name : '',
    email: '',
    password: ''
  }
  public successMessage: string;
  public errorMessage: string;
  public inputType: string = 'password'
  public isEmptyFormSubmitted: boolean;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  submitRegisterForm(){
    // If any of the field submitted blank
    if(this.user.name !== '' || this.user.email !== '' || this.user.password !== '') {
      this.isEmptyFormSubmitted = true
    }
    // All the fields are filled by user
    if(this.user.name !== '' && this.user.email !== '' && this.user.password !== '') {
      this.userService.register(this.user).subscribe((data) => {
          this.successMessage = data.result
          console.log(this.successMessage)
          this.isEmptyFormSubmitted = false
          this.router.navigate(['users/login']).then(response => response)
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
  }
}
