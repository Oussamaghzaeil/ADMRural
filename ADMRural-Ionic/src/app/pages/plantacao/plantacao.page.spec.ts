import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantacaoPage } from './plantacao.page';

describe('PlantacaoPage', () => {
  let component: PlantacaoPage;
  let fixture: ComponentFixture<PlantacaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantacaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
