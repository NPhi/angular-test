import {Component, HostBinding, Input, Output, Provider, forwardRef, EventEmitter} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, Validators, FormControl } from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TagsInputComponent),
    multi: true
};

@Component({
  selector: 'tags-input',
  templateUrl: './tags-input.component.html',
  styleUrls: ['./tags-input.component.css'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class TagsInputComponent implements ControlValueAccessor {

  @Input() placeholder: string = 'Add a tag';
  @Input() data: string[];
  @Input() delimiterCode: string = '188';
  @Input() addOnBlur: boolean = true;
  @Input() addOnEnter: boolean = true;
  @Input() addOnPaste: boolean = true;
  @Input() allowedTagsPattern: RegExp = /.+/;
  @Input() selfControl: FormControl;

  public tagsList: string[];
  public inputValue: string = '';
  public delimiter: number;
  public selectedTag: number;

  constructor() {
  }

  ngOnInit() {
    if (this.data) this.tagsList = this.data;
    this.onChange(this.tagsList);
    this.delimiter = parseInt(this.delimiterCode);
  }

  ngAfterViewInit() {
    // If the user passes an undefined variable to data this will warn
    // and set the value to an empty array
    if (!this.tagsList) {
      console.warn('TagInputComponent was passed an undefined value in data. Please make sure the variable is defined.');
      this.tagsList = [];
      this.onChange(this.tagsList);
    }
  }

  inputChanged(event) {
    let key = event.keyCode;
    switch(key) {
      case 13: //Enter
      	event.preventDefault();
        this.addOnEnter && this._addTags([this.inputValue]);
        event.preventDefault();
        break;

      case this.delimiter:
        this._addTags([this.inputValue]);
        event.preventDefault();
        break;

      default:
        this._resetSelected();
        break;
    }
  }

  onInputChanging(value){
    this.inputValue = value;
    this.resetErrorsForControl();
    this.isRequired(value);
  }

  isRequired(value){
    if(this.isStringEmpty(value)) {
        this.setErrorsForControl({
          required : true
        })
    }
  }

  setErrorsForControl(errors){
    this.selfControl.setErrors(errors);
  }

  resetErrorsForControl(){
    if(this.selfControl.errors != null){
          this.setErrorsForControl(null);
    }
  }

  inputPaste(event) {
    let clipboardData = event.clipboardData || (event.originalEvent && event.originalEvent.clipboardData);
    let pastedString = clipboardData.getData('text/plain');
    let tags = this._splitString(pastedString);
    let tagsToAdd = tags.filter((tag) => this._isTagValid(tag));
    this._addTags(tagsToAdd);
    setTimeout(() => this.inputValue = '', 3000);
  }

  private _splitString(tagString: string) {
    tagString = tagString.trim();
    let tags = tagString.split(String.fromCharCode(this.delimiter));
    return tags.filter((tag) => !!tag);
  }

  private _isTagValid(tagString: string) {
    return !this.isStringEmpty(tagString) && this.allowedTagsPattern.test(tagString);
  }

  private isStringEmpty(str) {
    return str.trim() === '';
  }

  private _addTags(tags: string[]) {
    let validTags = tags.filter((tag) => this._isTagValid(tag))
                        .map((tag) => tag.trim());
    if(validTags.length === 0) {
      return;
    }
    this.tagsList = this.tagsList.concat(validTags);
    this._resetSelected();
    this._resetInput();
    this.onChange(this.tagsList);
  }

  private _removeTag(tagIndexToRemove) {
    this.tagsList.splice(tagIndexToRemove, 1);
    this._resetSelected();
    this.onChange(this.tagsList);
  }

  private _handleBackspace() {
    // if (!this.inputValue.length && this.tagsList.length) {
    //   if (this.selectedTag != null) {
    //     this._removeTag(this.selectedTag);
    //   }
    //   else {
    //     this.selectedTag = this.tagsList.length - 1;
    //   }
    // }
  }

  private _resetSelected() {
    this.selectedTag = null;
  }

  private _resetInput() {
    this.inputValue = '';
  }

   //Set touched on blur
  onBlur() {
     this.onTouched();
  }

  /** Implemented as part of ControlValueAccessor. */
  onChange: (_) => any = () => { };

  onTouched: () => any = () => { };

  writeValue(value: any) {
    if(value !== this.tagsList){
      this.tagsList = value;
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

}
