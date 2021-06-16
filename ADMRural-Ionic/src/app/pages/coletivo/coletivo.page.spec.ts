import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColetivoPage } from './coletivo.page';

describe('ColetivoPage', () => {
  let component: ColetivoPage;
  let fixture: ComponentFixture<ColetivoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColetivoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColetivoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
