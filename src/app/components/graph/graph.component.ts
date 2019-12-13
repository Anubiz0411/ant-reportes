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
            { y: this.ocurrencies['tipoTerritorio']['vereda'],              label: "Vereda: ".concat(this.ocurrencies['tipoTerritorio']['vereda']) },
            { y: this.ocurrencies['tipoTerritorio']['corregimiento'],       label: "Corregimiento: ".concat(this.ocurrencies['tipoTerritorio']['corregimiento']) },
            { y: this.ocurrencies['tipoTerritorio']['cabecera municipal'],  label: "Cabecera Municipal: ".concat(this.ocurrencies['tipoTerritorio']['cabecera municipal']) },
            { y: this.ocurrencies['tipoTerritorio']['na'],                  label: "N/A: ".concat(this.ocurrencies['tipoTerritorio']['na']) },
            { y: this.ocurrencies['tipoTerritorio']['otro'],                label: "Otro: ".concat(this.ocurrencies['tipoTerritorio']['otro']) },
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
            { y: this.ocurrencies['zonaManejo']['pdet'],  label: "PDET: ".concat(this.ocurrencies['zonaManejo']['pdet']) },
            { y: this.ocurrencies['zonaManejo']['zrc'],   label: "ZRC: ".concat(this.ocurrencies['zonaManejo']['zrc']) },
            { y: this.ocurrencies['zonaManejo']['zvc'],   label: "Zona Veredales de Concentración: ".concat(this.ocurrencies['zonaManejo']['zvc']) },
            { y: this.ocurrencies['zonaManejo']['na'],    label: "N/A: ".concat(this.ocurrencies['zonaManejo']['na']) },
            { y: this.ocurrencies['zonaManejo']['otro'],  label: "Otro: ".concat(this.ocurrencies['zonaManejo']['otro']) },
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
            { y: this.ocurrencies['documentoPropiedad']['registrada'],    label: "Resolución de adjudicación registrada: ".concat(this.ocurrencies['documentoPropiedad']['registrada']) },
            { y: this.ocurrencies['documentoPropiedad']['sin registrar'], label: "Resolución de adjudicación sin registrar: ".concat(this.ocurrencies['documentoPropiedad']['sin registrar']) },
            { y: this.ocurrencies['documentoPropiedad']['otro'],          label: "Otro: ".concat(this.ocurrencies['documentoPropiedad']['otro']) },
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
            { y: this.ocurrencies['actividadDiferente']['si'], label: "Si: ".concat(this.ocurrencies['actividadDiferente']['si']) },
            { y: this.ocurrencies['actividadDiferente']['no'], label: "No: ".concat(this.ocurrencies['actividadDiferente']['no']) },
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
            { y: this.ocurrencies['grupoEtario']['primera infacia'],  label: "Primera Infacia: ".concat(this.ocurrencies['grupoEtario']['primera infacia']) },
            { y: this.ocurrencies['grupoEtario']['infancia'],         label: "Infancia: ".concat(this.ocurrencies['grupoEtario']['infancia']) },
            { y: this.ocurrencies['grupoEtario']['preadolescentes'],  label: "Preadolescentes: ".concat(this.ocurrencies['grupoEtario']['preadolescentes']) },
            { y: this.ocurrencies['grupoEtario']['adolescentes'],     label: "Adolescentes: ".concat(this.ocurrencies['grupoEtario']['adolescentes']) },
            { y: this.ocurrencies['grupoEtario']['adultos'],          label: "adultos: ".concat(this.ocurrencies['grupoEtario']['adultos']) },
            { y: this.ocurrencies['grupoEtario']['adultos mayores'],  label: "Adultos Mayores: ".concat(this.ocurrencies['grupoEtario']['adultos mayores']) },
            { y: this.ocurrencies['grupoEtario']['todas anteriores'], label: "todas anteriores: ".concat(this.ocurrencies['grupoEtario']['todas anteriores']) },
            { y: this.ocurrencies['grupoEtario']['ninguna'],          label: "Ninguna: ".concat(this.ocurrencies['grupoEtario']['ninguna']) },
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
            { y: this.ocurrencies['estadoAbandono']['si'], label: "Si: ".concat(this.ocurrencies['estadoAbandono']['si']) },
            { y: this.ocurrencies['estadoAbandono']['no'], label: "No: ".concat(this.ocurrencies['estadoAbandono']['no']) },
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
            { y: this.ocurrencies['infraestructuraInstalada']['si'], label: "Si: ".concat(this.ocurrencies['infraestructuraInstalada']['si']) },
            { y: this.ocurrencies['infraestructuraInstalada']['no'], label: "No: ".concat(this.ocurrencies['infraestructuraInstalada']['no']) },
            { y: this.ocurrencies['infraestructuraInstalada']['na'], label: "N/A: ".concat(this.ocurrencies['infraestructuraInstalada']['na']) },
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
            { y: this.ocurrencies['estadoInfraestructura']['exelente'],   label: "Exelente: ".concat(this.ocurrencies['estadoInfraestructura']['exelente']) },
            { y: this.ocurrencies['estadoInfraestructura']['muy bueno'],  label: "Muy Bueno: ".concat(this.ocurrencies['estadoInfraestructura']['muy bueno']) },
            { y: this.ocurrencies['estadoInfraestructura']['bueno'],      label: "Bueno: ".concat(this.ocurrencies['estadoInfraestructura']['bueno']) },
            { y: this.ocurrencies['estadoInfraestructura']['regular'],    label: "Regular: ".concat(this.ocurrencies['estadoInfraestructura']['regular']) },
            { y: this.ocurrencies['estadoInfraestructura']['malo'],       label: "Malo: ".concat(this.ocurrencies['estadoInfraestructura']['malo']) },
            { y: this.ocurrencies['estadoInfraestructura']['pesimo'],     label: "Pésimo: ".concat(this.ocurrencies['estadoInfraestructura']['pesimo']) },
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
            { y: this.ocurrencies['tipoInfraestructura']['si'], label: "Si: ".concat(this.ocurrencies['tipoInfraestructura']['si']) },
            { y: this.ocurrencies['tipoInfraestructura']['no'], label: "No: ".concat(this.ocurrencies['tipoInfraestructura']['no']) },
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
            { y: this.ocurrencies['inversionInfraestructura']['si'], label: "Si: ".concat(this.ocurrencies['inversionInfraestructura']['si']) },
            { y: this.ocurrencies['inversionInfraestructura']['no'], label: "No: ".concat(this.ocurrencies['inversionInfraestructura']['no']) },
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
            { y: this.ocurrencies['energiaElectrica']['si'], label: "Si: ".concat(this.ocurrencies['energiaElectrica']['si']) },
            { y: this.ocurrencies['energiaElectrica']['no'], label: "No: ".concat(this.ocurrencies['energiaElectrica']['no']) },
            { y: this.ocurrencies['energiaElectrica']['na'], label: "N/A: ".concat(this.ocurrencies['energiaElectrica']['na']) },

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
            { y: this.ocurrencies['abasteciomientoAgua']['si'], label: "Si: ".concat(this.ocurrencies['abasteciomientoAgua']['si']) },
            { y: this.ocurrencies['abasteciomientoAgua']['no'], label: "No: ".concat(this.ocurrencies['abasteciomientoAgua']['no']) },
            { y: this.ocurrencies['abasteciomientoAgua']['na'], label: "N/A: ".concat(this.ocurrencies['abasteciomientoAgua']['na']) },

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
            { y: this.ocurrencies['institucion']['jac'],                    label: "JAC: ".concat(this.ocurrencies['institucion']['jac']) },
            { y: this.ocurrencies['institucion']['institucion educativa'],  label: "Institución Educativa: ".concat(this.ocurrencies['institucion']['institucion educativa']) },
            { y: this.ocurrencies['institucion']['comunidad territorio'],   label: "Comunidad Territorio: ".concat(this.ocurrencies['institucion']['comunidad territorio']) },
            { y: this.ocurrencies['institucion']['otro'],                   label: "otro: ".concat(this.ocurrencies['institucion']['otro']) },
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
            { y: this.ocurrencies['actividadAdjudicada']['deacuerdo'],    label: "Completamente acorde al objetivo de adjudicación: ".concat(this.ocurrencies['actividadAdjudicada']['deacuerdo']) },
            { y: this.ocurrencies['actividadAdjudicada']['parcialmente'], label: "Parcialmente acorde al objetivo: ".concat(this.ocurrencies['actividadAdjudicada']['parcialmente']) },
            { y: this.ocurrencies['actividadAdjudicada']['incompatible'], label: "Incompatible con la adjudicación: ".concat(this.ocurrencies['actividadAdjudicada']['incompatible']) },
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
            { y: this.ocurrencies['estadoActual']['exelente'],  label: "Exelente: ".concat(this.ocurrencies['estadoActual']['exelente']) },
            { y: this.ocurrencies['estadoActual']['muy bueno'], label: "Muy Bueno: ".concat(this.ocurrencies['estadoActual']['muy bueno']) },
            { y: this.ocurrencies['estadoActual']['bueno'],     label: "Bueno: ".concat(this.ocurrencies['estadoActual']['bueno']) },
            { y: this.ocurrencies['estadoActual']['regular'],   label: "Regular: ".concat(this.ocurrencies['estadoActual']['regular']) },
            { y: this.ocurrencies['estadoActual']['malo'],      label: "Malo: ".concat(this.ocurrencies['estadoActual']['malo']) },
            { y: this.ocurrencies['estadoActual']['pesimo'],    label: "Pésimo: ".concat(this.ocurrencies['estadoActual']['pesimo']) },
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
            { y: this.ocurrencies['calidadServicioPrestado']['exelente'],   label: "Exelente: ".concat(this.ocurrencies['calidadServicioPrestado']['exelente']) },
            { y: this.ocurrencies['calidadServicioPrestado']['muy bueno'],  label: "Muy Bueno: ".concat(this.ocurrencies['calidadServicioPrestado']['muy bueno']) },
            { y: this.ocurrencies['calidadServicioPrestado']['bueno'],      label: "Bueno: ".concat(this.ocurrencies['calidadServicioPrestado']['bueno']) },
            { y: this.ocurrencies['calidadServicioPrestado']['regular'],    label: "Regular: ".concat(this.ocurrencies['calidadServicioPrestado']['regular']) },
            { y: this.ocurrencies['calidadServicioPrestado']['malo'],       label: "Malo: ".concat(this.ocurrencies['calidadServicioPrestado']['malo']) },
            { y: this.ocurrencies['calidadServicioPrestado']['pesimo'],     label: "Pésimo: ".concat(this.ocurrencies['calidadServicioPrestado']['pesimo']) },
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
            { y: this.ocurrencies['inversionActividades']['si'], label: "Si: ".concat(this.ocurrencies['inversionActividades']['si']) },
            { y: this.ocurrencies['inversionActividades']['no'], label: "No: ".concat(this.ocurrencies['inversionActividades']['no']) },
            { y: this.ocurrencies['inversionActividades']['na'], label: "N/A: ".concat(this.ocurrencies['inversionActividades']['na']) },
          ]
        }]
      });
      chart.render();

      let departamentoDataPoints: any = []

      for(let departamento in this.ocurrencies['departamento']) {
        if (departamento !== '') {
          departamentoDataPoints.push({
            label: departamento,
            y: this.ocurrencies['departamento'][departamento]
          });
        }
      }

      chart = new CanvasJS.Chart("departamento", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: "1.1 - Departamento"
        },
        data: [{
          type: "column",
          dataPoints: departamentoDataPoints
        }]
      });
      chart.render();

      let municipioDataPoints: any = []

      for(let municipio in this.ocurrencies['municipio']) {
        console.log(municipio);
        if (municipio !== '') {
          municipioDataPoints.push({
            label: municipio,
            y: this.ocurrencies['municipio'][municipio]
          });
        }
      }

      chart = new CanvasJS.Chart("municipio", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: "1.2 - Municipio"
        },
        data: [{
          type: "column",
          dataPoints: municipioDataPoints
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
