import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-calculator',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
    formGroup: FormGroup;
    result: number = 0;

    constructor(private fb: FormBuilder) {
        this.formGroup = this.fb.group({
            a: [0, [Validators.required, Validators.pattern(/^[0-9.]+$/)]],
            b: [0, [Validators.required, Validators.pattern(/^[0-9.]+$/)]]
        });
    }

    clear() {
        this.result = 0;
        this.formGroup.reset({ a: 0, b: 0 });
    }

    add(): void {
        if (this.formGroup.valid) {
            const { a, b } = this.formGroup.value;
            this.result = a + b;
        }
    }

    subtract(): void {
        if (this.formGroup.valid) {
            const { a, b } = this.formGroup.value;
            this.result = a - b;
        }
    }

    multiply(): void {
        if (this.formGroup.valid) {
            const { a, b } = this.formGroup.value;
            this.result = a * b;
        }
    }

    divide(): void {
        if (this.formGroup.valid) {
            const { a, b } = this.formGroup.value;
            if (b != 0) {
                this.result = a / b;
            } else {
                alert('You cannot divide by zero');
            }
        }
    }
}
