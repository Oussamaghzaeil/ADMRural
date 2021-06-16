import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoestoquePage } from './tipoestoque.page';

describe('TipoestoquePage', () => {
  let component: TipoestoquePage;
  let fixture: ComponentFixture<TipoestoquePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoestoquePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoestoquePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
