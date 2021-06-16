import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapapontosdeinteresseeditPage } from './mapapontosdeinteresseedit.page';

describe('MapapontosdeinteresseeditPage', () => {
  let component: MapapontosdeinteresseeditPage;
  let fixture: ComponentFixture<MapapontosdeinteresseeditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapapontosdeinteresseeditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapapontosdeinteresseeditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
