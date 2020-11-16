import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LembreteInserirComponent } from './lembrete-inserir.component';

describe('LembreteInserirComponent', () => {
  let component: LembreteInserirComponent;
  let fixture: ComponentFixture<LembreteInserirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LembreteInserirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LembreteInserirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
