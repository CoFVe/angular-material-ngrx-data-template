import { TopnavComponent } from '@/app/dashboard/components/topnav/topnav.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';


describe('TopnavComponent', () => {
    let component: TopnavComponent;
    let fixture: ComponentFixture<TopnavComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TopnavComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TopnavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
