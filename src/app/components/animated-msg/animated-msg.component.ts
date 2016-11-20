import { Component, OnInit, Input, trigger,
  state,
  style,
  transition,
  animate,keyframes } from '@angular/core';


@Component({
  selector: 'animated-msg',
  templateUrl: './animated-msg.component.html',
  styleUrls: ['./animated-msg.component.css'],
  animations: [
    trigger('visibilityChange', [
      transition('void => *', [
        style({opacity:0,height: 0}), //style only for transition transition (after transiton it removes)
        animate(250, style({opacity:1, height: 20})) // the new state of the transition(after transiton it removes)
      ]),
      transition('* => void', [
        animate(250, style({opacity:0, height: 0})) // the new state of the transition(after transiton it removes)
      ])
    ])
  ]
})
export class AnimatedMsgComponent implements OnInit {

	@Input() isVisible = false

	ngOnInit() { }

}
