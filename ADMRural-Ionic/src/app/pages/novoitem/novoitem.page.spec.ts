import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoitemPage } from './novoitem.page';

describe('NovoitemPage', () => {
  let component: NovoitemPage;
  let fixture: ComponentFixture<NovoitemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoitemPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoitemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
