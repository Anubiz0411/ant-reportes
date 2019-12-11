import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  state: any;
  data: any;

  constructor(
    private location: Location
  ) {
   }

  ngOnInit() {
    this.state = this.location.getState();
    this.data = this.state.data;
  }

}
