/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AutomotivesComponent } from './automotives.component';

describe('AutomotivesComponent', () => {
  let component: AutomotivesComponent;
  let fixture: ComponentFixture<AutomotivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomotivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomotivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
