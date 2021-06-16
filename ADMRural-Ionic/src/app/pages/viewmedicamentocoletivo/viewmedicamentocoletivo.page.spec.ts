import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmedicamentocoletivoPage } from './viewmedicamentocoletivo.page';

describe('ViewmedicamentocoletivoPage', () => {
  let component: ViewmedicamentocoletivoPage;
  let fixture: ComponentFixture<ViewmedicamentocoletivoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewmedicamentocoletivoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewmedicamentocoletivoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
