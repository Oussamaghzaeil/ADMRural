import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovocolheitaPage } from './novocolheita.page';

describe('NovocolheitaPage', () => {
  let component: NovocolheitaPage;
  let fixture: ComponentFixture<NovocolheitaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovocolheitaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovocolheitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
