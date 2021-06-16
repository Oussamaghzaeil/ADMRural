import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateunidadePage } from './createunidade.page';

describe('CreateunidadePage', () => {
  let component: CreateunidadePage;
  let fixture: ComponentFixture<CreateunidadePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateunidadePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateunidadePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
