import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartForm } from './chart-form';

describe('ChartForm', () => {
  let component: ChartForm;
  let fixture: ComponentFixture<ChartForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
