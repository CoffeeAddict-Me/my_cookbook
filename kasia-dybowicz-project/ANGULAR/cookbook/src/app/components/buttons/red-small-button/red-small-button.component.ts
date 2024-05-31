import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-red-small-button',
    templateUrl: './red-small-button.component.html',
    styleUrl: './red-small-button.component.scss'
})
export class RedSmallButtonComponent implements OnInit {
    @Input() typeButtonText?: string;

    @Output() buttonOutput: EventEmitter<boolean> = new EventEmitter<boolean>();

    buttonWasPressed() {
        this.buttonOutput.emit();
    }

    ngOnInit() {
        this.typeButtonText = this.typeButtonText ? this.typeButtonText : `no name`
    }

}
