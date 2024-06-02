import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BlueMediumButtonComponent} from './blue-medium-button.component';

describe('BlueMediumButtonComponent', () => {
    let component: BlueMediumButtonComponent;
    let fixture: ComponentFixture<BlueMediumButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BlueMediumButtonComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(BlueMediumButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
