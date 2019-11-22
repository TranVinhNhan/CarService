import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { AutotypeService } from 'src/app/_services/autotype.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AutoType } from 'src/app/_models/autotype';

@Component({
  selector: 'app-type-editor',
  templateUrl: './type-editor.component.html',
  styleUrls: ['./type-editor.component.css']
})
export class TypeEditorComponent implements OnInit {

  model: any = {};
  @Input() types: AutoType[];
  @ViewChild('resetBtn', { static: false }) resetBtn: ElementRef<HTMLElement>;

  constructor(
    private autotypeService: AutotypeService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
  }

  addType() {
    this.autotypeService.addType(this.model).subscribe((response: any) => {
      this.alertify.success('Type Added');
      this.types.push(response);
      const reset: HTMLElement = this.resetBtn.nativeElement;
      reset.click();
    }, error => {
      this.alertify.error(error);
    });
  }
}
