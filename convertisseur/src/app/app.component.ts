import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription, timer } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit, OnDestroy{

  public static EUR: string = 'EUR';
  public static USD: string = 'USD';
  public static INIT_RATE: number = 1.1;

  title = 'convertisseur';

  public realRate: number = AppComponent.INIT_RATE;
  public fixRate: number
  public startCurrency: string = AppComponent.EUR;
  public endCurrency: string = AppComponent.USD;
  public initValue: number;
  public calculatedValue: number;
  public switchValue: boolean = false;
  public subscribeTimer$: Subscription;
  public disabledFixRateField: boolean =false;
  public historicalList:historical[]=[];

ngOnInit(){
 this.timerRealRate();
}

timerRealRate() {
  const source = timer(0,3000);
  this.subscribeTimer$ = source.subscribe(val => {
    this.realRate = this.realRate + this.generateRandomNumber();
    console.log((this.realRate - AppComponent.INIT_RATE)/AppComponent.INIT_RATE *100);
  if((this.realRate - AppComponent.INIT_RATE)/AppComponent.INIT_RATE *100 > 2){
    this.disabledFixRateField = true;
  } else {
    this.disabledFixRateField = false;
  }
  });

}

 generateRandomNumber(){
  return Math.random() * (0.5 - 0) + 0;
}

compute(){
  this.calculatedValue = this.initValue * this.realRate;
  this.historicalList.push(
    {
      realRate:this.realRate,
      fixRate: this.fixRate,
      start:{
        currency: this.startCurrency,
        value: this.initValue
      },
      end:{
        currency: this.endCurrency,
        value: this.calculatedValue
      }
    }
  )
  console.log(this.historicalList);
}

ngOnDestroy(){
  this.subscribeTimer$.unsubscribe();
}

changeValue(value){
  console.log(value);
  this.initValue=value;
}

switchCurrency(){
  this.calculatedValue = 0;
  this.initValue = 0;
  console.log(this.switchValue);
  if(this.switchValue){
    this.startCurrency = AppComponent.USD;
    this.endCurrency = AppComponent.EUR;
  } else {
    this.startCurrency = AppComponent.EUR;
    this.endCurrency = AppComponent.USD;
  }
}

}
