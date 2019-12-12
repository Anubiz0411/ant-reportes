import { Component, OnInit, ViewChild, AfterViewInit, NgModule } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';


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
  departamentoFilter              = new FormControl('');
  municipioFilter                 = new FormControl('');
  tipoTerritorioFilter            = new FormControl('');
  zonaManejoFilter                = new FormControl('');
  documentoPropiedadFilter        = new FormControl('');
  actividadDiferenteFilter        = new FormControl('');
  grupoEtarioFilter               = new FormControl('');
  estadoAbandonoFilter            = new FormControl('');
  infraestructuraInstaladaFilter  = new FormControl('');
  estadoInfraestructuraFilter     = new FormControl('');
  tipoInfraestructuraFilter       = new FormControl('');
  inversionInfraestructuraFilter  = new FormControl('');
  energiaElectricaFilter          = new FormControl('');
  abasteciomientoAguaFilter       = new FormControl('');
  institucionFilter               = new FormControl('');
  actividadAdjudicadaFilter       = new FormControl('');
  estadoActualFilter              = new FormControl('');
  calidadServicioPrestadoFilter   = new FormControl('');
  inversionActividadesFilter   = new FormControl('');

  filterValues = {
    solicitudEDP: '',
    departamento: '',
    municipio: '',
    tipoTerritorio: '',
    zonaManejo: '',
    documentoPropiedad: '',
    actividadDiferente: '',
    grupoEtario: '',
    estadoAbandono: '',
    infraestructuraInstalada: '',
    estadoInfraestructura: '',
    tipoInfraestructura: '',
    inversionInfraestructura: '',
    energiaElectrica: '',
    abasteciomientoAgua: '',
    institucion: '',
    actividadAdjudicada: '',
    estadoActual: '',
    calidadServicioPrestado: '',
    inversionActividades: ''
  };

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private dataService: DatabaseService,
    private router: Router
    ) { 
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

    this.departamentoFilter.valueChanges.subscribe(
      departamento => {
        this.filterValues.departamento = departamento.toLowerCase();
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )

    this.municipioFilter.valueChanges.subscribe(
      municipio => {
        this.filterValues.municipio = municipio.toLowerCase();
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

    this.estadoInfraestructuraFilter.valueChanges.subscribe(
      estadoInfraestructura => {
        this.filterValues.estadoInfraestructura = estadoInfraestructura;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )

    this.tipoInfraestructuraFilter.valueChanges.subscribe(
      tipoInfraestructura => {
        this.filterValues.tipoInfraestructura = tipoInfraestructura;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )

    this.inversionInfraestructuraFilter.valueChanges.subscribe(
      inversionInfraestructura => {
        this.filterValues.inversionInfraestructura = inversionInfraestructura;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )

    this.energiaElectricaFilter.valueChanges.subscribe(
      energiaElectrica => {
        this.filterValues.energiaElectrica = energiaElectrica;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )

    this.abasteciomientoAguaFilter.valueChanges.subscribe(
      abasteciomientoAgua => {
        this.filterValues.abasteciomientoAgua = abasteciomientoAgua;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )

    this.institucionFilter.valueChanges.subscribe(
      institucion => {
        this.filterValues.institucion = institucion;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )

    this.actividadAdjudicadaFilter.valueChanges.subscribe(
      actividadAdjudicada => {
        this.filterValues.actividadAdjudicada = actividadAdjudicada;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )

    this.estadoActualFilter.valueChanges.subscribe(
      estadoActual => {
        this.filterValues.estadoActual = estadoActual;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )

    this.calidadServicioPrestadoFilter.valueChanges.subscribe(
      calidadServicioPrestado => {
        this.filterValues.calidadServicioPrestado = calidadServicioPrestado;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )

    this.inversionActividadesFilter.valueChanges.subscribe(
      inversionActividades => {
        this.filterValues.inversionActividades = inversionActividades;
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
      && data.departamento.toLowerCase().indexOf(searchTerms.departamento) !== -1
      && data.municipio.toLowerCase().indexOf(searchTerms.municipio) !== -1
      && data.tipoTerritorio.toLowerCase().indexOf(searchTerms.tipoTerritorio) !== -1
      && data.zonaManejo.toLowerCase().indexOf(searchTerms.zonaManejo) !== -1
      && data.documentoPropiedad.toLowerCase().indexOf(searchTerms.documentoPropiedad) !== -1
      && data.actividadDiferente.toLowerCase().indexOf(searchTerms.actividadDiferente) !== -1
      && data.grupoEtario.toLowerCase().indexOf(searchTerms.grupoEtario) !== -1
      && data.estadoAbandono.toLowerCase().indexOf(searchTerms.estadoAbandono) !== -1
      && data.infraestructuraInstalada.toLowerCase().indexOf(searchTerms.infraestructuraInstalada) !== -1
      && data.estadoInfraestructura.toLowerCase().indexOf(searchTerms.estadoInfraestructura) !== -1
      && data.tipoInfraestructura.toLowerCase().indexOf(searchTerms.tipoInfraestructura) !== -1
      && data.inversionInfraestructura.toLowerCase().indexOf(searchTerms.inversionInfraestructura) !== -1
      && data.energiaElectrica.toLowerCase().indexOf(searchTerms.energiaElectrica) !== -1
      && data.abasteciomientoAgua.toLowerCase().indexOf(searchTerms.abasteciomientoAgua) !== -1
      && data.institucion.toLowerCase().indexOf(searchTerms.institucion) !== -1
      && data.actividadAdjudicada.toLowerCase().indexOf(searchTerms.actividadAdjudicada) !== -1
      && data.estadoActual.toLowerCase().indexOf(searchTerms.estadoActual) !== -1
      && data.calidadServicioPrestado.toLowerCase().indexOf(searchTerms.calidadServicioPrestado) !== -1
      && data.inversionActividades.toLowerCase().indexOf(searchTerms.inversionActividades) !== -1
     ;
    }
    return filterFunction;
  }
  
  generateGraphs() {    
    this.router.navigateByUrl('/graph', {state: {displayedColumns: this.displayedColumns, data: this.dataSource.filteredData} });
  }

}