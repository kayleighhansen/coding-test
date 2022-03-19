import { Component, OnInit } from '@angular/core';
import { Part } from '../parts.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { NgModule }      from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  partListChanged = new Subject<Part[]>();
  parts: Part[] = [];
  part: Part;

  tracking: string;
  message: string;
  trackingInput: string;
  
  showMe = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {}

  getParts(f) {
    // get tracking number
    this.tracking = f.form.controls.get.value;

    // reset table if user is resubmitting
    this.showMe = false;

    // get data
    this.http.get('https://www.jet-airways-stl.com/gt5ws.nsf/ws_trace2?openagent&a=' + this.tracking + '&noobject=false').subscribe((result: any) => {
      this.parts = result;

      // if results come back correctly
      if(this.parts.length > 0) {
        this.parts = result[0].awbs;

        // sort by name
        this.parts.sort((a , b) => 
          a.part > b.part ? 1 : b.part > a.part ? -1 : 0);

        // next part
        this.partListChanged.next(this.parts.slice());

        // show table
        this.showMe = true;

        // reset error message
        this.message = '';
      }
      else {
        // error message
        this.message = "No Tracking Available";
      };
      // reset input
      this.trackingInput = '';
    });
  }
}
