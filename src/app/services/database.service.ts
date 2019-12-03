import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  
  constructor(private afs: AngularFirestore) { }
  
  getData() {
    return this.afs.collection('_forms', ref => ref.orderBy('solicitudEDP', 'asc')).valueChanges();
  }
}
