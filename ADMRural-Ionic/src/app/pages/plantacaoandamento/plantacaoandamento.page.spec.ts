import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantacaoandamentoPage } from './plantacaoandamento.page';

describe('PlantacaoandamentoPage', () => {
  let component: PlantacaoandamentoPage;
  let fixture: ComponentFixture<PlantacaoandamentoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantacaoandamentoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantacaoandamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
