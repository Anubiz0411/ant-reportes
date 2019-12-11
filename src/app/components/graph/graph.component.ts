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
  displayedColumns: any;

  /**
   * Ocurrencies dict structure:
   * 
   * ocurrencies = {
   *    (key) [string] "displayedColumn Ex. tipoTerritorio" = {
   *                            (key) [string] "posible valor Ex. vereda" = (value) [int] Cantidad
   *                        }
   * }
   * 
   * Access to the dictionary values:
   * 
   * Ex. Get the users
   *  this.ocurrencies['user']
   * 
   * Get the amount of regs with "vereda"
   *  this.ocurrencies['tipoTerritorio']['vereda']
   * 
   */
  ocurrencies :any = {};

  constructor(
    private location: Location
  ) {
   }

  ngOnInit() {
    this.state = this.location.getState();
    this.data = this.state.data;
    this.displayedColumns = this.state.displayedColumns;
    this.setOcurrencies();
  }

  setOcurrencies() {
    for(let column of this.displayedColumns) {
      this.ocurrencies[column] = {};
      for(let item of this.data) {
        if (this.ocurrencies[column][item[column]]) {
          this.ocurrencies[column][item[column]] += 1;
        } else {
          this.ocurrencies[column][item[column]] = 1;
        }
      }
    }
  }

}
