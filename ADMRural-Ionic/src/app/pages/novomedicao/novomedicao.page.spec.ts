import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovomedicaoPage } from './novomedicao.page';

describe('NovomedicaoPage', () => {
  let component: NovomedicaoPage;
  let fixture: ComponentFixture<NovomedicaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovomedicaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovomedicaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
