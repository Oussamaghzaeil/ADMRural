import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewvendidoPage } from './viewvendido.page';

describe('ViewvendidoPage', () => {
  let component: ViewvendidoPage;
  let fixture: ComponentFixture<ViewvendidoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewvendidoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewvendidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
