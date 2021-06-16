import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColetivolistaPage } from './coletivolista.page';

describe('ColetivolistaPage', () => {
  let component: ColetivolistaPage;
  let fixture: ComponentFixture<ColetivolistaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColetivolistaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColetivolistaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
