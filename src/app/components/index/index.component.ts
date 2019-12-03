import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataSource } from '@angular/cdk/collections';
import { DatabaseService } from '../../services/database.service';
import { MatSort, MatInputModule } from '@angular/material';
import { DataBaseSource } from '../../services/dataBaseSource.module';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

export class IndexComponent implements OnInit, AfterViewInit {

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

  ngOnInit() {
  }

}