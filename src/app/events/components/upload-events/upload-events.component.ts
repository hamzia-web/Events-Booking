import { Component, OnInit } from '@angular/core';
import {IEvent} from "../../models/IEvent";
import {EventService} from "../../services/event.service";
import {Router} from "@angular/router";
import {UserService} from "../../../users/services/user.service";

@Component({
  selector: 'app-upload-events',
  templateUrl: './upload-events.component.html',
  styleUrls: ['./upload-events.component.scss']
})
export class UploadEventsComponent implements OnInit {

  public freeEvent: boolean;
  public event: IEvent = {
    name: '',
    image: '',
    date: '',
    type: '',
    price: null,
    info: '',
  }
  public message: string;
  public errorMessage: string;

  constructor(private eventService: EventService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  /**
   * Check event whether FREE or PRO
   * @param event
   */
  checkFreeEvent(event){
    this.freeEvent = event.target.value === 'FREE'
  }

  /**
   * Submit Upload event
   */
  submitUploadEvent(){
     this.eventService.uploadEvent(this.event).subscribe((data) => {
       this.message = data.result
         if(this.event.type === 'PRO')
         {
           this.router.navigate(['events/pro-events']).then(response => {})
         }
         else
         {
           this.router.navigate(['events/free-events']).then(response => {})
         }
       },
       error => {
           this.errorMessage = error
       })
  }

  /**
   * To check admin user or not
   */
  public isAdminUser()
  {
    return this.userService.isAdminUser()
  }
}
