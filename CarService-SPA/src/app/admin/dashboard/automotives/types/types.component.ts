import { Component, OnInit } from '@angular/core';
import { AutoType } from 'src/app/_models/autotype';
import { AutotypeService } from 'src/app/_services/autotype.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-automotive-types',
  templateUrl: './types.component.html',
  styleUrls: ['../../../admin.component.css']
})
export class TypesComponent implements OnInit {

  isCollapsed = true;
  types: AutoType[];
  
  constructor(
    private autotypeService: AutotypeService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.loadTypes();
  }

  loadTypes() {
    this.autotypeService.getTypes().subscribe((types: AutoType[]) => {
      this.types = types;
    }, error => {
      this.alertify.error(error);
    });
  }
}
