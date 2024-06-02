import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GreenBigButtonComponent} from './green-big-button.component';

describe('GreenBigButtonComponent', () => {
    let component: GreenBigButtonComponent;
    let fixture: ComponentFixture<GreenBigButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GreenBigButtonComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(GreenBigButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
