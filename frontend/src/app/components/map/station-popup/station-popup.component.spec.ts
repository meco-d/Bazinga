import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationPopupComponent } from '@core/components';

describe('StationPopipComponent', () => {
  let component: StationPopupComponent;
  let fixture: ComponentFixture<StationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StationPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
