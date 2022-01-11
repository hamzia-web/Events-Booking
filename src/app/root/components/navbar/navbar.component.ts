import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../users/services/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public theme: boolean
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  public isLoggedIn(){
    return this.userService.isLoggedIn()
  }

  public logout(){
    return this.userService.logout()
  }
  /**
   * Get user data
   */
  public getUserData(){
    return this.userService.getUserData()
  }
}
