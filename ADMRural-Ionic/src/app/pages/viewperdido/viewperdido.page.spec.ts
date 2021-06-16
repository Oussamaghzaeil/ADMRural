import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewperdidoPage } from './viewperdido.page';

describe('ViewperdidoPage', () => {
  let component: ViewperdidoPage;
  let fixture: ComponentFixture<ViewperdidoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewperdidoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewperdidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
