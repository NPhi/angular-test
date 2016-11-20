import { Component, OnInit, trigger,
  state,
  style,
  transition,
  animate,keyframes } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
	toggle: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggleElement(){
     this.toggle=!this.toggle;
  }

}
