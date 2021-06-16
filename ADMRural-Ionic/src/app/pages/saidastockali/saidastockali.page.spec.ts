import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaidastockaliPage } from './saidastockali.page';

describe('SaidastockaliPage', () => {
  let component: SaidastockaliPage;
  let fixture: ComponentFixture<SaidastockaliPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaidastockaliPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaidastockaliPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
