import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RecipeEditModalComponent} from './recipe-edit-modal.component';

describe('RecipeEditModalComponent', () => {
    let component: RecipeEditModalComponent;
    let fixture: ComponentFixture<RecipeEditModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RecipeEditModalComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(RecipeEditModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
