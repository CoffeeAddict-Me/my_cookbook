import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GreenMediumButtonComponent} from './green-medium-button.component';

describe('GreenMediumButtonComponent', () => {
    let component: GreenMediumButtonComponent;
    let fixture: ComponentFixture<GreenMediumButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GreenMediumButtonComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(GreenMediumButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
