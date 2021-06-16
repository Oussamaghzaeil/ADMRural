import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerdidoPage } from './perdido.page';

describe('PerdidoPage', () => {
  let component: PerdidoPage;
  let fixture: ComponentFixture<PerdidoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerdidoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerdidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
