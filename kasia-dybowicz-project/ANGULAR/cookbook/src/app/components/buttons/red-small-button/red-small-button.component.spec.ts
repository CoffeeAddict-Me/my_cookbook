import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RedSmallButtonComponent} from './red-small-button.component';

describe('RedSmallButtonComponent', () => {
    let component: RedSmallButtonComponent;
    let fixture: ComponentFixture<RedSmallButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RedSmallButtonComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(RedSmallButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
