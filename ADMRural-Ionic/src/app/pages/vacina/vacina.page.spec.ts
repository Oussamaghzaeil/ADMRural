import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacinaPage } from './vacina.page';

describe('VacinaPage', () => {
  let component: VacinaPage;
  let fixture: ComponentFixture<VacinaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacinaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacinaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
