import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RecipeWindowComponent} from './recipe-window.component';

describe('RecipeWindowComponent', () => {
    let component: RecipeWindowComponent;
    let fixture: ComponentFixture<RecipeWindowComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RecipeWindowComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(RecipeWindowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
