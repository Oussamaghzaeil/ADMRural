import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaitemsaidamedicaoPage } from './novaitemsaidamedicao.page';

describe('NovaitemsaidamedicaoPage', () => {
  let component: NovaitemsaidamedicaoPage;
  let fixture: ComponentFixture<NovaitemsaidamedicaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaitemsaidamedicaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaitemsaidamedicaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
