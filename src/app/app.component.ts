import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataSource } from '@angular/cdk/collections';
import { DatabaseService } from './services/database.service';
import { MatSort, MatInputModule} from '@angular/material';

 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
 
  dataBaseDetails = {
    solicitudEDP: '',
    departamento: '',
    municipio: '',
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
    actividadAdjudicada: '',
    calidadServicioPrestado: '',
    inversionActividades: '',
    user: '',
  }
 
  displayedColumns = ['solicitudEDP', 'departamento', 'municipio', 'documentoPropiedad', 'actividadDiferente', 'grupoEtario', 'estadoAbandono', 'infraestructuraInstalada', 'estadoInfraestructura', 'tipoInfraestructura', 'inversionInfraestructura', 'energiaElectrica', 'abasteciomientoAgua', 'actividadAdjudicada', 'calidadServicioPrestado', 'inversionActividades','user'];
  dataSource = new DataBaseSource(this.data);
  
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private data: DatabaseService, private afs: AngularFirestore) { }


  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;  
  }
	
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
 
export class DataBaseSource extends DataSource<any> {
  
  sort: MatSort;
  filter: string;
 
  constructor(private data: DatabaseService) {
    super()
  }
 
  connect() {
    return this.data.getData();
  }
 
  disconnect() {
 
  }
}