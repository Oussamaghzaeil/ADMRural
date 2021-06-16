import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoitemmedPage } from './novoitemmed.page';

describe('NovoitemmedPage', () => {
  let component: NovoitemmedPage;
  let fixture: ComponentFixture<NovoitemmedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoitemmedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoitemmedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
