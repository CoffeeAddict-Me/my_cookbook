import {Component, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'app-list-form',
    templateUrl: './list-form.component.html',
    styleUrl: './list-form.component.scss'
})
export class ListFormComponent {

    buttonAdd: string = "ADD"
    stuffToAdd?: string;
    @Output() awesomeOutput = new EventEmitter<string>;

    addStuff(value: string | undefined) {
        if (this.stuffToAdd?.trim() !== '') {
            this.awesomeOutput.emit(this.stuffToAdd);
            this.stuffToAdd = '';
        }

    }

}
