import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferadoscoletivoPage } from './transferadoscoletivo.page';

describe('TransferadoscoletivoPage', () => {
  let component: TransferadoscoletivoPage;
  let fixture: ComponentFixture<TransferadoscoletivoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferadoscoletivoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferadoscoletivoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
