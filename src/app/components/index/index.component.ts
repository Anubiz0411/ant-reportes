import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatabaseService } from '../../services/database.service';
import { MatSort, MatInputModule } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

export class IndexComponent implements OnInit, AfterViewInit {

  displayedColumns = ['solicitudEDP', 'departamento', 'municipio', 'documentoPropiedad', 'actividadDiferente', 'grupoEtario', 'estadoAbandono', 'infraestructuraInstalada', 'estadoInfraestructura', 'tipoInfraestructura', 'inversionInfraestructura', 'energiaElectrica', 'abasteciomientoAgua', 'actividadAdjudicada', 'calidadServicioPrestado', 'inversionActividades','user'];
  dataSource = new MatTableDataSource<any>();
  data:any = [];

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private dataService: DatabaseService) {}

  ngOnInit() {
    this.dataService.getData().subscribe(res => {
      res.map((item: any) => {
        this.data.push({
          solicitudEDP:             item.solicitudEDP,
          departamento:             item.capituloUno.departamento,
          municipio:                item.capituloUno.municipio,
          documentoPropiedad:       item.capituloDos.documentoPropiedad,
          actividadDiferente:       item.capituloDos.actividadDiferente,
          grupoEtario:              item.capituloDos.grupoEtario,
          estadoAbandono:           item.capituloDos.estadoAbandono,
          infraestructuraInstalada: item.capituloTres.infraestructuraInstalada,
          estadoInfraestructura:    item.capituloTres.estadoInfraestructura,
          tipoInfraestructura:      item.capituloTres.tipoInfraestructura,
          inversionInfraestructura: item.capituloTres.inversionInfraestructura,
          energiaElectrica:         item.capituloTres.energiaElectrica,
          abasteciomientoAgua:      item.capituloTres.abasteciomientoAgua,
          actividadAdjudicada:      item.capituloCuatro.actividadAdjudicada,
          calidadServicioPrestado:  item.capituloCuatro.calidadServicioPrestado,
          inversionActividades:     item.capituloCuatro.inversionActividades,
          user:                     item.user,
        });
      });
      this.dataSource.data = this.data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}