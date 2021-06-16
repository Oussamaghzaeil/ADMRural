import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapamedicaolinearPage } from './mapamedicaolinear.page';

describe('MapamedicaolinearPage', () => {
  let component: MapamedicaolinearPage;
  let fixture: ComponentFixture<MapamedicaolinearPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapamedicaolinearPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapamedicaolinearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
