import { Component, OnInit, ViewChild, AfterViewInit, NgModule } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

export class IndexComponent implements OnInit, AfterViewInit {

  displayedColumns  = ['solicitudEDP', 'departamento', 'municipio', 'tipoTerritorio', 'zonaManejo', 'documentoPropiedad', 'actividadDiferente', 'grupoEtario', 'estadoAbandono', 'infraestructuraInstalada', 'estadoInfraestructura', 'tipoInfraestructura', 'inversionInfraestructura', 'energiaElectrica', 'abasteciomientoAgua', 'institucion', 'actividadAdjudicada', 'estadoActual','calidadServicioPrestado', 'inversionActividades','user'];
  dataSource        = new MatTableDataSource<any>();
  data:any          = [];
  selection         = new SelectionModel<DatabaseService>(true, []);

  /* Filtros */
  solicitiudFilter                = new FormControl('');
  tipoTerritorioFilter            = new FormControl('');
  zonaManejoFilter                = new FormControl('');
  documentoPropiedadFilter        = new FormControl('');
  actividadDiferenteFilter        = new FormControl('');
  grupoEtarioFilter               = new FormControl('');
  estadoAbandonoFilter            = new FormControl('');
  infraestructuraInstaladaFilter  = new FormControl('');

  filterValues = {
    solicitudEDP: '',
    tipoTerritorio: '',
    zonaManejo: '',
    documentoPropiedad: '',
    actividadDiferente: '',
    grupoEtario: '',
    estadoAbandono: '',
    infraestructuraInstalada: '',
  };

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private dataService: DatabaseService) { 
    this.dataSource.filterPredicate = this.tableFilter();
  }

  ngOnInit() {
    this.dataService.getData().subscribe(res => {
      res.map((item: any) => {
        this.data.push({
          solicitudEDP:             item.solicitudEDP,
          departamento:             item.capituloUno.departamento || '',
          municipio:                item.capituloUno.municipio || '',
          tipoTerritorio:           item.capituloUno.tipoTerritorio || '',
          zonaManejo:               item.capituloUno.zonaManejo || '',
          documentoPropiedad:       item.capituloDos.documentoPropiedad || '',
          actividadDiferente:       item.capituloDos.actividadDiferente || '',
          grupoEtario:              item.capituloDos.grupoEtario || '',
          estadoAbandono:           item.capituloDos.estadoAbandono || '',
          infraestructuraInstalada: item.capituloTres.infraestructuraInstalada || '',
          estadoInfraestructura:    item.capituloTres.estadoInfraestructura || '',
          tipoInfraestructura:      item.capituloTres.tipoInfraestructura || '',
          inversionInfraestructura: item.capituloTres.inversionInfraestructura || '',
          energiaElectrica:         item.capituloTres.energiaElectrica || '',
          abasteciomientoAgua:      item.capituloTres.abasteciomientoAgua || '',
          institucion:              item.capituloCuatro.institucion || '',
          actividadAdjudicada:      item.capituloCuatro.actividadAdjudicada || '',
          estadoActual:             item.capituloCuatro.estadoActual || '',
          calidadServicioPrestado:  item.capituloCuatro.calidadServicioPrestado || '',
          inversionActividades:     item.capituloCuatro.inversionActividades || '',
          user:                     item.user,
        });
      });
      this.dataSource.data = this.data;
    });

    this.solicitiudFilter.valueChanges.subscribe(
      solicitudEDP => {
        this.filterValues.solicitudEDP = solicitudEDP.toLowerCase();
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )

    this.tipoTerritorioFilter.valueChanges.subscribe(
      tipoTerritorio => {
        this.filterValues.tipoTerritorio = tipoTerritorio;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )

    this.zonaManejoFilter.valueChanges.subscribe(
      zonaManejo => {
        this.filterValues.zonaManejo = zonaManejo;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )

    this.documentoPropiedadFilter.valueChanges.subscribe(
      documentoPropiedad => {
        this.filterValues.documentoPropiedad = documentoPropiedad;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )

    this.actividadDiferenteFilter.valueChanges.subscribe(
      actividadDiferente => {
        this.filterValues.actividadDiferente = actividadDiferente;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )

    this.grupoEtarioFilter.valueChanges.subscribe(
      grupoEtario => {
        this.filterValues.grupoEtario = grupoEtario;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )

    this.estadoAbandonoFilter.valueChanges.subscribe(
      estadoAbandono => {
        this.filterValues.estadoAbandono = estadoAbandono;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )

    this.infraestructuraInstaladaFilter.valueChanges.subscribe(
      infraestructuraInstalada => {
        this.filterValues.infraestructuraInstalada = infraestructuraInstalada;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  
  tableFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.solicitudEDP.toLowerCase().indexOf(searchTerms.solicitudEDP) !== -1
      && data.tipoTerritorio.toLowerCase().indexOf(searchTerms.tipoTerritorio) !== -1
      && data.zonaManejo.toLowerCase().indexOf(searchTerms.zonaManejo) !== -1
      && data.documentoPropiedad.toLowerCase().indexOf(searchTerms.documentoPropiedad) !== -1
      && data.actividadDiferente.toLowerCase().indexOf(searchTerms.actividadDiferente) !== -1
      && data.grupoEtario.toLowerCase().indexOf(searchTerms.grupoEtario) !== -1
      && data.estadoAbandono.toLowerCase().indexOf(searchTerms.estadoAbandono) !== -1
      && data.infraestructuraInstalada.toLowerCase().indexOf(searchTerms.infraestructuraInstalada) !== -1
     ;
    }
    return filterFunction;
  } 

}