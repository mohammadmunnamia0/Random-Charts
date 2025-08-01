import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartFormComponent } from './chart-form';

describe('ChartFormComponent', () => {
  let component: ChartFormComponent;
  let fixture: ComponentFixture<ChartFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
