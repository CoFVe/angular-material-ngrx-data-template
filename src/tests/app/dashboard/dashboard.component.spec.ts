import { DashboardComponent } from '@/app/dashboard/views/dashboard-page/dashboard.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
          declarations: [DashboardComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
