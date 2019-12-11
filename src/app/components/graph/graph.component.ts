import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import * as CanvasJS from './canvasjs.min';

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
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "tipoTerritorio".replace(/([A-Z])/g, ' $1')
        // uppercase the first character
        .replace(/^./, function(str){ return str.toUpperCase(); })
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: this.ocurrencies['tipoTerritorio']['vereda'], label: "Vereda" },
          { y: this.ocurrencies['tipoTerritorio']['corregimiento'], label: "Corregimiento" },
          { y: this.ocurrencies['tipoTerritorio']['cabecera municipal'], label: "Cabecera Municipal" },
          { y: this.ocurrencies['tipoTerritorio']['na'], label: "N/A" },
          { y: this.ocurrencies['tipoTerritorio']['otro'], label: "Otro" },
        ]
      }]
    });
    chart.render();
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
