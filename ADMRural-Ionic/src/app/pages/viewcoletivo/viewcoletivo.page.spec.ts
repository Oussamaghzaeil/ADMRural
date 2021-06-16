import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcoletivoPage } from './viewcoletivo.page';

describe('ViewcoletivoPage', () => {
  let component: ViewcoletivoPage;
  let fixture: ComponentFixture<ViewcoletivoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewcoletivoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewcoletivoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
