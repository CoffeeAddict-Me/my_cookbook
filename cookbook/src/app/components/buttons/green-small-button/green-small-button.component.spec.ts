import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GreenSmallButtonComponent} from './green-small-button.component';

describe('GreenSmallButtonComponent', () => {
    let component: GreenSmallButtonComponent;
    let fixture: ComponentFixture<GreenSmallButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GreenSmallButtonComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(GreenSmallButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
