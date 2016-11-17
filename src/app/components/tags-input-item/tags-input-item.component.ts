import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tags-input-item',
  templateUrl: './tags-input-item.component.html',
  styleUrls: ['./tags-input-item.component.css']
})
export class TagsInputItemComponent implements OnInit {
  @Input() selected: boolean;
  @Input() text: string;
  @Input() index: number;
  @Output() tagRemoved: EventEmitter<number> = new EventEmitter();

  constructor() { }

  removeTag() {
    this.tagRemoved.emit(this.index);
  }
  
  ngOnInit() {
  }

}
