import { Directive, ElementRef, Renderer, HostListener, OnDestroy } from '@angular/core'

const ClassName:any = {
  SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
  BACKDROP: 'modal-backdrop',
  OPEN: 'modal-open',
  FADE: 'fade',
  IN: 'in',         // bs3
  ACTIVE: 'active'  // bs4
};

@Directive({
	selector: '[bsModal]',
	exportAs: 'bs-modal'
})
export class ModalDirective implements OnDestroy {

	_isShown = false
	timerHideModal;

	constructor(private renderer : Renderer,
				private element : ElementRef){}

	ngOnDestroy() {
		if(this._isShown){
			this._isShown = false;
			this.hide();
		}
		//set properties undefined
		this._isShown = void 0;
		this.timerHideModal = void 0;
	}

	@HostListener('click', ['$event'])
	public onClick(event){

		if( event.target !== this.element.nativeElement){
			return;
		}

		this.hide();
	}

	public toggle(){
		return this._isShown ? this.hide() : this.show();
	}

	public show(){

		if(this._isShown) {
			return;
		}

		this._isShown = true;

		this.renderer.setElementClass(document.body, ClassName.OPEN,true);

		this.showBackdrop(() => this.showElement());

	}

	private showElement(){

		this.renderer.setElementAttribute(this.element.nativeElement, 'aria-hidden', 'false');
		this.renderer.setElementStyle(this.element.nativeElement, 'display', 'block');
		this.renderer.setElementProperty(this.element.nativeElement, 'scrollTop', 0);

		this.renderer.setElementClass(this.element.nativeElement,ClassName.IN,true);
		this.renderer.setElementClass(this.element.nativeElement,ClassName.ACTIVE,true);

	}

	public hide(){
		// if(event){
		// 	event.prevenDefault();
		// }

		if(!this._isShown){
			return;
		}

		clearTimeout(this.timerHideModal);

		this._isShown = false;

		this.renderer.setElementClass(this.element.nativeElement, ClassName.IN, false);
		this.renderer.setElementClass(this.element.nativeElement, ClassName.ACTIVE, false);

		//set amination for hiding modal
		this.timerHideModal = setTimeout(() => this.hideModal(), 300);

	}

	hideModal(){
		this.renderer.setElementAttribute(this.element.nativeElement, 'aria-hidden', 'true');
		this.renderer.setElementStyle(this.element.nativeElement, 'display', 'none');
		this.renderer.setElementClass(document.body, ClassName.OPEN, false);
	}

	showBackdrop(callback) {
		if(this._isShown){
			
		}
		callback();
	}


}