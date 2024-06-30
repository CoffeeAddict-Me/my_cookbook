import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-small-button',
  standalone: true,
  imports: [],
  templateUrl: './small-button.component.html',
  styleUrl: './small-button.component.scss'
})
export class SmallButtonComponent implements OnInit {
  @Input() typeButtonText?: string;

  @Output() buttonOutput: EventEmitter<boolean> = new EventEmitter<boolean>();

  buttonWasPressed() {
    this.buttonOutput.emit();
  }

  ngOnInit() {
    this.typeButtonText = this.typeButtonText ? this.typeButtonText : `no name`
  }

}

