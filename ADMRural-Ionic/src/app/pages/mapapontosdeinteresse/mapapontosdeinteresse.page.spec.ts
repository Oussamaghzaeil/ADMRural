import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapapontosdeinteressePage } from './mapapontosdeinteresse.page';

describe('MapapontosdeinteressePage', () => {
  let component: MapapontosdeinteressePage;
  let fixture: ComponentFixture<MapapontosdeinteressePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapapontosdeinteressePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapapontosdeinteressePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
