import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlimcoletivoPage } from './alimcoletivo.page';

describe('AlimcoletivoPage', () => {
  let component: AlimcoletivoPage;
  let fixture: ComponentFixture<AlimcoletivoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlimcoletivoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlimcoletivoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
