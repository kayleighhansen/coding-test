import { Component } from '@angular/core';
import { Part } from './parts.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { NgModule }      from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-coding-test';
  parts: Part[] = [];
  part: Part;

  tracking: string;

  displayParts: Part[] = [];

  showMe = false;

  partListChanged = new Subject<Part[]>();

  constructor(private http: HttpClient) { 

  }

  getParts(f) {

    let tracking = f.form.controls.get.value;

    this.http.get('https://www.jet-airways-stl.com/gt5ws.nsf/ws_trace2?openagent&a=' + tracking + '&noobject=false').subscribe((result: any) => {
        
      this.parts = result[0].awbs;

      this.parts.sort((a , b) => 
        a.part > b.part ? 1 : b.part > a.part ? -1 : 0);
        this.partListChanged.next(this.parts.slice());
      },
    );
    this.showMe = true;
  }
}
