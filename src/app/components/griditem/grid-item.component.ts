import { Component, Input,Output,EventEmitter,DoCheck,OnInit,ChangeDetectionStrategy } from '@angular/core';

@Component({
 selector: 'grid-item',
 templateUrl: './grid-item.component.html',
 styleUrls: ['./grid-item.component.css']
})
export class GridItemComponent implements DoCheck{
	public dragging;
	public position;
	
	@Input() cols;

	@Input() containerWidth;

	@Input() rowHeight;

	@Input() containerPadding;

	@Input() margin;

	@Input() w;

	@Input() h;

	@Input() x;

	@Input() y;

	@Input() i;

	@Input() isStatic = false;

	@Input() isSideLayout = false;

	@Output() onDrag = new EventEmitter<any>();
	@Output() onDragStop = new EventEmitter<any>();

	constructor(){}

	ngDoCheck() { 
		let {x,y,w,h} = this;

		const pos = this.calcPosition(x,y,w,h);

		this.position = pos
  	}

	calcPosition(x,y,w,h) {
	    const {margin, containerPadding, rowHeight} = this;
	    const colWidth = this.calcColWidth();

	    const out = {
	      left: Math.round((colWidth + margin[0]) * x + containerPadding[0]),
	      top: Math.round((rowHeight + margin[1]) * y + containerPadding[1]),
	      // 0 * Infinity === NaN, which causes problems with resize constraints;
	      // Fix this if it occurs.
	      // Note we do it here rather than later because Math.round(Infinity) causes deopt
	      width: w === Infinity ? w : Math.round(colWidth * w + Math.max(0, w - 1) * margin[0]),
	      height: h === Infinity ? h : Math.round(rowHeight * h + Math.max(0, h - 1) * margin[1])
	    };

	    if (this.dragging) {
	      out.top = Math.round(this.dragging.top);
	      out.left = Math.round(this.dragging.left);
	    }

	    return out;
	}

	handleOnDragStart({event,coreEvent}){
		if(this.isStatic){
			return;
		}
		const {node} = coreEvent;
		const newPosition = {top: 0,left: 0};

		const parentRect = node.offsetParent.getBoundingClientRect();
		const clientRect = node.getBoundingClientRect();
		
		newPosition.left = clientRect.left - parentRect.left;
		newPosition.top = clientRect.top - parentRect.top;
		
		this.dragging = newPosition;
	}
	handleOnDrag({event,coreEvent}){
		if(this.isStatic){
			return;
		}
		const {node,deltaX,deltaY} = coreEvent;
		const newPosition = {top:0,left:0};
		if(!this.dragging) throw new Error('onDrag called before onDragStart.');
		newPosition.left = this.dragging.left + deltaX;
		newPosition.top = this.dragging.top + deltaY;
		this.dragging = newPosition;
		const {x,y} = this.calcXY(newPosition.top,newPosition.left);
		const i = this.i;
		const e = {event,node,newPosition};
		this.onDrag.next({i,x,y,e});
	}
	handleOnDragStop({event,coreEvent}){
		if(this.isStatic){
			return;
		}
		const {node,deltaX,deltaY} = coreEvent;
		const newPosition = {top: 0,left: 0};
		if(!this.dragging) throw new Error('onDrag called before onDragStart.');
		newPosition.left = this.dragging.left;
		newPosition.top = this.dragging.top;
		this.dragging = null;
		const {x,y} = this.calcXY(newPosition.top,newPosition.left);
		const i = this.i;
		const e = {event,node,newPosition};
		this.onDragStop.next({i,x,y,e});
	}

	setStyles(){
		let styles = {
			'width': this.position.width + 'px',
			'height': this.position.height + 'px',
			'top': this.position.top + 'px',
			'left': this.position.left + 'px',
		}

		return styles;
	}

	// Helper for generating column width
	calcColWidth(): number {
		const {margin, containerPadding, containerWidth, cols} = this;
		return (containerWidth - (margin[0] * (cols - 1)) - (containerPadding[0] * 2)) / cols;
	}

	calcXY(top, left) {
	    const {cols, rowHeight, w, h,margin,isSideLayout} = this;
	    const colWidth = this.calcColWidth();

	    let x = Math.round((left - margin[0]) / (colWidth + margin[0]));
	   	
	   	const scrollTop = x === 0 || !isSideLayout ? 0 : window.pageYOffset;

	    let y = Math.round((top + scrollTop - margin[1]) / (rowHeight + margin[1]));

	    // Capping
	    x = Math.max(Math.min(x, cols - w), 0);
	    y = Math.max(Math.min(y, Infinity - h), 0); //maxRows

	    //bring item to the first col if it is dropped on the static timeline col
	    if(x === 1) {
	    	x = 0
	    }

	    return {x, y};
  	}

  	mapYWithTime() {
  		return this.getTimeY().toLocaleTimeString()
  	}

  	getTimeY() {
  		const m = this.y * 2.5
  		return displayByHour(m)
  	}

  	getEndHour() {
  		const m = this.h * 2.5
  		return addMinutes(this.getTimeY(),m).toLocaleTimeString()
  	}
}

function displayByHour(minutes) {
	let d = new Date("October 13, 2014 8:00:00");
	return addMinutes(d,minutes)
}
function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
}


