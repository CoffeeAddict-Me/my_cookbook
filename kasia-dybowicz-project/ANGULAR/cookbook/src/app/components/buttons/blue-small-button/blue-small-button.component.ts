import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-blue-small-button',
    templateUrl: './blue-small-button.component.html',
    styleUrl: './blue-small-button.component.scss'
})
export class BlueSmallButtonComponent implements OnInit {
    @Input() typeButtonText?: string;

    @Output() buttonOutput: EventEmitter<boolean> = new EventEmitter<boolean>();

    buttonWasPressed() {
        this.buttonOutput.emit();
    }

    ngOnInit() {
        this.typeButtonText = this.typeButtonText ? this.typeButtonText : `no name`
    }

}
