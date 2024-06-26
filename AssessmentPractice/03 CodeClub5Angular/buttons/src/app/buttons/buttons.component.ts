import {Component} from '@angular/core';

@Component({
    selector: 'app-buttons',
    standalone: true,
    imports: [],
    templateUrl: './buttons.component.html',
    styleUrl: './buttons.component.scss'
})
export class ButtonsComponent {

    counter: number = 0

    increase() {
        this.counter += 1
    }

    decrease() {
        this.counter -= 1
    }

    clear() {
        this.counter = 0
    }

    surprise() {
        this.counter /= 100
    }

}
