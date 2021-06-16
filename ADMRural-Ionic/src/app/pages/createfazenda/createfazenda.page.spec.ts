import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatefazendaPage } from './createfazenda.page';

describe('CreatefazendaPage', () => {
  let component: CreatefazendaPage;
  let fixture: ComponentFixture<CreatefazendaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatefazendaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatefazendaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
