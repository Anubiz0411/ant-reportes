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
    private location: Location,
    private router: Router
  ) {
   }

  ngOnInit() {
    this.state = this.location.getState();
    if(!this.state.data){
      this.router.navigate(['/index']);
    } else{
      this.data = this.state.data;
      this.displayedColumns = this.state.displayedColumns;
      this.setOcurrencies();
      let chart = new CanvasJS.Chart("tipoTerritorio", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: "1.3 - Tipo de Territorio"
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
      chart = new CanvasJS.Chart("zonaManejo", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: "1.4 - Zona de Manejo"
        },
        data: [{
          type: "column",
          dataPoints: [
            { y: this.ocurrencies['zonaManejo']['pdet'], label: "PDET" },
            { y: this.ocurrencies['zonaManejo']['zrc'], label: "ZRC" },
            { y: this.ocurrencies['zonaManejo']['zvc'], label: "Zona Veredales de Concentración" },
            { y: this.ocurrencies['zonaManejo']['na'], label: "N/A" },
            { y: this.ocurrencies['zonaManejo']['otro'], label: "Otro" },
          ]
        }]
      });
      chart.render();
      chart = new CanvasJS.Chart("documentoPropiedad", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: "2.3 - ¿Qué documento de propiedad posee del predio?"
        },
        data: [{
          type: "column",
          dataPoints: [
            { y: this.ocurrencies['documentoPropiedad']['registrada'], label: "Resolución de adjudicación registrada" },
            { y: this.ocurrencies['documentoPropiedad']['sin registrar'], label: "Resolución de adjudicación sin registrar" },
            { y: this.ocurrencies['documentoPropiedad']['otro'], label: "Otro" },
          ]
        }]
      });
      chart.render();
      chart = new CanvasJS.Chart("actividadDiferente", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: "2.6 - ¿Dentro del predio adjudicado se desarrolla una activdad diferente a la establecida en el acto administrativo de adjudicación?"
        },
        data: [{
          type: "column",
          dataPoints: [
            { y: this.ocurrencies['actividadDiferente']['si'], label: "Si" },
            { y: this.ocurrencies['actividadDiferente']['no'], label: "No" },
          ]
        }]
      });
      chart.render();
      chart = new CanvasJS.Chart("grupoEtario", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: "2.9 - Grupo etario beneficiado por la actividad desarrollada en el predio"
        },
        data: [{
          type: "column",
          dataPoints: [
            { y: this.ocurrencies['grupoEtario']['primera infacia'], label: "Primera Infacia" },
            { y: this.ocurrencies['grupoEtario']['infancia'], label: "Infancia" },
            { y: this.ocurrencies['grupoEtario']['preadolescentes'], label: "Preadolescentes" },
            { y: this.ocurrencies['grupoEtario']['adolescentes'], label: "Adolescentes" },
            { y: this.ocurrencies['grupoEtario']['adultos'], label: "adultos" },
            { y: this.ocurrencies['grupoEtario']['adultos mayores'], label: "Adultos Mayores" },
            { y: this.ocurrencies['grupoEtario']['todas anteriores'], label: "todas anteriores" },
            { y: this.ocurrencies['grupoEtario']['ninguna'], label: "Ninguna" },
          ]
        }]
      });
      chart.render();
      chart = new CanvasJS.Chart("estadoAbandono", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: "2.10 - ¿El predio se encuentra en estado de abandono?"
        },
        data: [{
          type: "column",
          dataPoints: [
            { y: this.ocurrencies['estadoAbandono']['si'], label: "Si" },
            { y: this.ocurrencies['estadoAbandono']['no'], label: "No" },
          ]
        }]
      });
      chart.render();
      chart = new CanvasJS.Chart("infraestructuraInstalada", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: "3.1 - ¿El predio cuenta con infraestructura instalada?"
        },
        data: [{
          type: "column",
          dataPoints: [
            { y: this.ocurrencies['infraestructuraInstalada']['si'], label: "Si" },
            { y: this.ocurrencies['infraestructuraInstalada']['no'], label: "No" },
            { y: this.ocurrencies['infraestructuraInstalada']['na'], label: "N/A" },
          ]
        }]
      });
      chart.render();
      chart = new CanvasJS.Chart("estadoInfraestructura", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: "3.2 - Estado general de la infraestructura"
        },
        data: [{
          type: "column",
          dataPoints: [
            { y: this.ocurrencies['estadoInfraestructura']['exelente'], label: "Exelente" },
            { y: this.ocurrencies['estadoInfraestructura']['muy bueno'], label: "Muy Bueno" },
            { y: this.ocurrencies['estadoInfraestructura']['bueno'], label: "Bueno" },
            { y: this.ocurrencies['estadoInfraestructura']['regular'], label: "Regular" },
            { y: this.ocurrencies['estadoInfraestructura']['malo'], label: "Malo" },
            { y: this.ocurrencies['estadoInfraestructura']['pesimo'], label: "Pésimo" },
          ]
        }]
      });
      chart.render();
      chart = new CanvasJS.Chart("tipoInfraestructura", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: "3.3 - ¿La infraestructura existía antes?"
        },
        data: [{
          type: "column",
          dataPoints: [
            { y: this.ocurrencies['tipoInfraestructura']['si'], label: "Si" },
            { y: this.ocurrencies['tipoInfraestructura']['no'], label: "No" },
          ]
        }]
      });
      chart.render();
      chart = new CanvasJS.Chart("inversionInfraestructura", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: "3.4 - ¿Inversiones o mejoras posteriores a la adjudicación?"
        },
        data: [{
          type: "column",
          dataPoints: [
            { y: this.ocurrencies['inversionInfraestructura']['si'], label: "Si" },
            { y: this.ocurrencies['inversionInfraestructura']['no'], label: "No" },
          ]
        }]
      });
      chart.render();
      chart = new CanvasJS.Chart("energiaElectrica", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: "3.5 - ¿El predio cuenta con energía eléctrica?"
        },
        data: [{
          type: "column",
          dataPoints: [
            { y: this.ocurrencies['energiaElectrica']['si'], label: "Si" },
            { y: this.ocurrencies['energiaElectrica']['no'], label: "No" },
            { y: this.ocurrencies['energiaElectrica']['na'], label: "N/A" },

          ]
        }]
      });
      chart.render();
      chart = new CanvasJS.Chart("abasteciomientoAgua", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: "3.6 - ¿El predio cuenta con abastecimiento de agua?"
        },
        data: [{
          type: "column",
          dataPoints: [
            { y: this.ocurrencies['abasteciomientoAgua']['si'], label: "Si" },
            { y: this.ocurrencies['abasteciomientoAgua']['no'], label: "No" },
            { y: this.ocurrencies['abasteciomientoAgua']['na'], label: "N/A" },

          ]
        }]
      });
      chart.render();
      chart = new CanvasJS.Chart("institucion", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: "4.6 - ¿A qué institución pertenece?"
        },
        data: [{
          type: "column",
          dataPoints: [
            { y: this.ocurrencies['institucion']['jac'], label: "JAC" },
            { y: this.ocurrencies['institucion']['institucion educativa'], label: "Institución Educativa" },
            { y: this.ocurrencies['institucion']['comunidad territorio'], label: "Comunidad Territorio" },
            { y: this.ocurrencies['institucion']['otro'], label: "otro" },
          ]
        }]
      });
      chart.render();
      chart = new CanvasJS.Chart("actividadAdjudicada", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: "4.7 - ¿Qué cargo tiene dentro de esta institución?"
        },
        data: [{
          type: "column",
          dataPoints: [
            { y: this.ocurrencies['actividadAdjudicada']['deacuerdo'], label: "Completamente acorde al objetivo de adjudicación" },
            { y: this.ocurrencies['actividadAdjudicada']['parcialmente'], label: "Parcialmente acorde al objetivo" },
            { y: this.ocurrencies['actividadAdjudicada']['incompatible'], label: "Incompatible con la adjudicación" },
          ]
        }]
      });
      chart.render();
      chart = new CanvasJS.Chart("estadoActual", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: "4.9 - El estado actual de la infraestructura es"
        },
        data: [{
          type: "column",
          dataPoints: [
            { y: this.ocurrencies['estadoActual']['exelente'], label: "Exelente" },
            { y: this.ocurrencies['estadoActual']['muy bueno'], label: "Muy Bueno" },
            { y: this.ocurrencies['estadoActual']['bueno'], label: "Bueno" },
            { y: this.ocurrencies['estadoActual']['regular'], label: "Regular" },
            { y: this.ocurrencies['estadoActual']['malo'], label: "Malo" },
            { y: this.ocurrencies['estadoActual']['pesimo'], label: "Pésimo" },
          ]
        }]
      });
      chart.render();
      chart = new CanvasJS.Chart("calidadServicioPrestado", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: "4.10 - Calidad Servicio Prestado"
        },
        data: [{
          type: "column",
          dataPoints: [
            { y: this.ocurrencies['calidadServicioPrestado']['exelente'], label: "Exelente" },
            { y: this.ocurrencies['calidadServicioPrestado']['muy bueno'], label: "Muy Bueno" },
            { y: this.ocurrencies['calidadServicioPrestado']['bueno'], label: "Bueno" },
            { y: this.ocurrencies['calidadServicioPrestado']['regular'], label: "Regular" },
            { y: this.ocurrencies['calidadServicioPrestado']['malo'], label: "Malo" },
            { y: this.ocurrencies['calidadServicioPrestado']['pesimo'], label: "Pésimo" },
          ]
        }]
      });
      chart.render();
      chart = new CanvasJS.Chart("inversionActividades", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: "4.11 - ¿Se han invertido recursos para mejorar la calidad de los servicios o actividades desarrolladas dentro del predio?"
        },
        data: [{
          type: "column",
          dataPoints: [
            { y: this.ocurrencies['inversionActividades']['si'], label: "Si" },
            { y: this.ocurrencies['inversionActividades']['no'], label: "No" },
            { y: this.ocurrencies['inversionActividades']['na'], label: "N/A" },
          ]
        }]
      });
      chart.render();
    }
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
