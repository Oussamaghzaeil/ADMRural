import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapamedicaodeareasPage } from './mapamedicaodeareas.page';

describe('MapamedicaodeareasPage', () => {
  let component: MapamedicaodeareasPage;
  let fixture: ComponentFixture<MapamedicaodeareasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapamedicaodeareasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapamedicaodeareasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
