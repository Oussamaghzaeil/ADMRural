import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewtransferedcoletivoPage } from './viewtransferedcoletivo.page';

describe('ViewtransferedcoletivoPage', () => {
  let component: ViewtransferedcoletivoPage;
  let fixture: ComponentFixture<ViewtransferedcoletivoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewtransferedcoletivoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewtransferedcoletivoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
