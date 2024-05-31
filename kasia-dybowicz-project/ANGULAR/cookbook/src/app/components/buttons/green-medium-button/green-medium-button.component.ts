import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-green-medium-button',
    templateUrl: './green-medium-button.component.html',
    styleUrl: './green-medium-button.component.scss'
})
export class GreenMediumButtonComponent implements OnInit {
    @Input() typeButtonText?: string;

    @Output() buttonOutput: EventEmitter<boolean> = new EventEmitter<boolean>();

    buttonWasPressed() {
        this.buttonOutput.emit();
    }

    ngOnInit() {
        this.typeButtonText = this.typeButtonText ? this.typeButtonText : `no name`
    }

}
