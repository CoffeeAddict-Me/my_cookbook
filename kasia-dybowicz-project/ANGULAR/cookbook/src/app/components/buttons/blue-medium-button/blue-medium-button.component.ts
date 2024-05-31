import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-blue-medium-button',
    templateUrl: './blue-medium-button.component.html',
    styleUrl: './blue-medium-button.component.scss'
})
export class BlueMediumButtonComponent implements OnInit {
    @Input() typeButtonText?: string;

    @Output() buttonOutput: EventEmitter<boolean> = new EventEmitter<boolean>();

    buttonWasPressed() {
        this.buttonOutput.emit();
    }

    ngOnInit() {
        this.typeButtonText = this.typeButtonText ? this.typeButtonText : `no name`
    }

}
