import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BlueSmallButtonComponent} from './blue-small-button.component';

describe('BlueSmallButtonComponent', () => {
    let component: BlueSmallButtonComponent;
    let fixture: ComponentFixture<BlueSmallButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BlueSmallButtonComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(BlueSmallButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
