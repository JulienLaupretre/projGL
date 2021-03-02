import { Directive, Input, OnChanges, SimpleChanges, ElementRef } from '@angular/core';

@Directive({
selector: '[appProgressBarColor]'
})
export class ProgressBarColor implements OnChanges{
static counter = 0;
color: string;
current_date : Date = new Date();
@Input() appProgressBarColor;
styleEl:HTMLStyleElement = document.createElement('style');

//generate unique attribule which we will use to minimise the scope of our dynamic 
style 
uniqueAttr = `app-progress-bar-color-${ProgressBarColor.counter++}`;

constructor(private el: ElementRef) { 
const nativeEl: HTMLElement = this.el.nativeElement;
nativeEl.setAttribute(this.uniqueAttr,'');
nativeEl.appendChild(this.styleEl);
}

ngOnChanges(changes: SimpleChanges): void{
this.updateColor();
}

updateColor(): void{
  var d = this.current_date.toISOString().substring(0, 10);
  if (this.appProgressBarColor > d){
    this.appProgressBarColor = 'green'
  }
  else if( this.appProgressBarColor == d)
  {
    this.appProgressBarColor = 'orange';
  }
  else{
    this.appProgressBarColor = 'red'
  }
 // console.log(this.appProgressBarColor)
  
  // update dynamic style with the uniqueAttr
  this.styleEl.innerText = `
    [${this.uniqueAttr}] .mat-progress-bar-fill::after {
      background-color: ${this.appProgressBarColor};
    }
  `;
 // console.log(this.appProgressBarColor)  
  }}