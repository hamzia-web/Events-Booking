import { Component, OnInit } from '@angular/core';
import {EventService} from "../../services/event.service";
import {IEvent} from "../../models/IEvent";

@Component({
  selector: 'app-pro-events',
  templateUrl: './pro-events.component.html',
  styleUrls: ['./pro-events.component.scss']
})
export class ProEventsComponent implements OnInit {

  public events: IEvent[];
  public errorMessage: string
  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.getProEvents().subscribe((data) =>{
        this.events = data
    }, (error => {
        this.errorMessage = error
    }))
  }

}
