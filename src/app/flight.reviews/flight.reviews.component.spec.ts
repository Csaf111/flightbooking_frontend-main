import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightReviewsComponent } from './flight.reviews.component';

describe('FlightReviewsComponent', () => {
  let component: FlightReviewsComponent;
  let fixture: ComponentFixture<FlightReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightReviewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
