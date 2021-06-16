import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovotipoalimPage } from './novotipoalim.page';

describe('NovotipoalimPage', () => {
  let component: NovotipoalimPage;
  let fixture: ComponentFixture<NovotipoalimPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovotipoalimPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovotipoalimPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
