import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriartipoalimPage } from './criartipoalim.page';

describe('CriartipoalimPage', () => {
  let component: CriartipoalimPage;
  let fixture: ComponentFixture<CriartipoalimPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriartipoalimPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriartipoalimPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
