import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovomedicamentocoletivoPage } from './novomedicamentocoletivo.page';

describe('NovomedicamentocoletivoPage', () => {
  let component: NovomedicamentocoletivoPage;
  let fixture: ComponentFixture<NovomedicamentocoletivoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovomedicamentocoletivoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovomedicamentocoletivoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
