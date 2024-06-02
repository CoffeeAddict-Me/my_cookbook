import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RecipeAddModalComponent} from './recipe-add-modal.component';

describe('RecipeAddModalComponent', () => {
    let component: RecipeAddModalComponent;
    let fixture: ComponentFixture<RecipeAddModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RecipeAddModalComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(RecipeAddModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
