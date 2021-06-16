import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColheitaPage } from './colheita.page';

describe('ColheitaPage', () => {
  let component: ColheitaPage;
  let fixture: ComponentFixture<ColheitaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColheitaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColheitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
