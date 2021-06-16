import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovounidadPage } from './novounidad.page';

describe('NovounidadPage', () => {
  let component: NovounidadPage;
  let fixture: ComponentFixture<NovounidadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovounidadPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovounidadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
