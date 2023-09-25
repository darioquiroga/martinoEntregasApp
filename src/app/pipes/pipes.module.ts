import { NgModule } from '@angular/core';

import { DatePipe, CurrencyPipe } from '@angular/common';
import { NumeroFormat } from './numeroformat';
import { CurrencyFormat } from './currencyformat';
import { KilosFormat } from './kilosformat';

@NgModule({
  declarations: [
    CurrencyFormat,
    KilosFormat,
    NumeroFormat,
  ],
  exports: [
    CurrencyFormat,
    KilosFormat,
    NumeroFormat,
  ],
  providers:[
    DatePipe,
    CurrencyPipe,
    CurrencyFormat,
    KilosFormat,
    NumeroFormat,
  ]
})
export class PipesModule { }
