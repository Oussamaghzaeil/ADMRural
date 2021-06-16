import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimaiscoletivoPage } from './animaiscoletivo.page';

describe('AnimaiscoletivoPage', () => {
  let component: AnimaiscoletivoPage;
  let fixture: ComponentFixture<AnimaiscoletivoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimaiscoletivoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimaiscoletivoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
