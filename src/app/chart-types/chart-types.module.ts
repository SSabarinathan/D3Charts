import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';


import { ChartTypesRoutingModule } from './chart-types-routing.module';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';


@NgModule({
  declarations: [
    BarChartComponent,
    PieChartComponent
  ],
  imports: [
    CommonModule,
    ChartTypesRoutingModule
  ]
})
export class ChartTypesModule {

 }
