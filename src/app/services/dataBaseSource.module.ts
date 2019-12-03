import { DataSource } from '@angular/cdk/table';
import { DatabaseService } from './database.service';
import { MatSort } from '@angular/material';

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