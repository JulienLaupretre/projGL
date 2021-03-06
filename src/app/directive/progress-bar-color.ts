import { Directive, Input, OnChanges, SimpleChanges, ElementRef } from '@angular/core';

@Directive({
selector: '[appProgressBarColor]'
})
export class ProgressBarColor implements OnChanges{
static counter = 0;
color: string;
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
  var startDate = new Date();
  var endDateTask = new Date(this.appProgressBarColor.endDate);
  var noOfDaysToAdd = this.appProgressBarColor.remainingWorkload, count = 0, endDate;


  if(noOfDaysToAdd>0)
  {
  while(count < noOfDaysToAdd){
      endDate = new Date(startDate.setDate(startDate.getDate() + 1));
      if(endDate.getDay() != 0 && endDate.getDay() != 6){
        count++;
      }
    }

  
  console.log("debut");
  console.log(endDateTask);
  console.log(endDate);
  console.log((endDateTask.getTime() - endDate.getTime())/(1000*3600*24));
  
  if (endDate <= endDateTask){
    this.appProgressBarColor = 'green';
  }
  else if((endDate.getTime()-endDateTask.getTime())/(1000*3600*24) < 2 && (endDate.getTime()-endDateTask.getTime())/(1000*3600*24) > 0)
  {
    this.appProgressBarColor = 'orange';
  }
  else{
    this.appProgressBarColor = 'red';
  }


}else{
  this.appProgressBarColor = 'blue';

}
  
 // console.log(this.appProgressBarColor)
  
  // update dynamic style with the uniqueAttr
  this.styleEl.innerText = `
    [${this.uniqueAttr}] .mat-progress-bar-fill::after {
      background-color: ${this.appProgressBarColor};
    }
  `;
 // console.log(this.appProgressBarColor)  
  }



}