import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FazendaPage } from './fazenda.page';

describe('FazendaPage', () => {
  let component: FazendaPage;
  let fixture: ComponentFixture<FazendaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FazendaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FazendaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
