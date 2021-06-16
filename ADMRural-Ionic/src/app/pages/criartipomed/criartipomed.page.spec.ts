import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriartipomedPage } from './criartipomed.page';

describe('CriartipomedPage', () => {
  let component: CriartipomedPage;
  let fixture: ComponentFixture<CriartipomedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriartipomedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriartipomedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
