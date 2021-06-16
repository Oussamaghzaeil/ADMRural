import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriartipoPage } from './criartipo.page';

describe('CriartipoPage', () => {
  let component: CriartipoPage;
  let fixture: ComponentFixture<CriartipoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriartipoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriartipoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
