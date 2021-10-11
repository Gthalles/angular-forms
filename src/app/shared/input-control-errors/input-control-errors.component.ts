import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input-control-errors',
  templateUrl: './input-control-errors.component.html',
  styleUrls: ['./input-control-errors.component.css']
})
export class InputControlErrorsComponent implements OnInit {
  @Input() showError: boolean = false;
  @Input() errorMessage: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
