import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DatabaseService } from 'src/app/services/database.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  item: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataservice: DatabaseService
  ) { }

  ngOnInit() {
    
    let edp = this.route.snapshot.paramMap.get('edp');

    this.item = this.dataservice.getItem(edp);
    
  }

}
