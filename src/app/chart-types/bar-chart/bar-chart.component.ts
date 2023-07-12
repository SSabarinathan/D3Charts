import { Component, ElementRef, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { select, scaleBand, scaleLinear } from 'd3';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements OnInit {
  constructor(
    private elementRef: ElementRef
  ) {}
  ngOnInit() {
    this.createBarChart();
    // this.createCircle();
    // this.createRectangle();
    // /
    this.createSvg();
    this.drawBars(this.data);
  }
//1st sample chart
createRectangle(){
  d3.select('svg')
  .append('rect')
  .attr('width','250')
  .attr('height','100')
  .attr('x','100')
  .attr('y','100')
  .attr('fill','violet')
  .on('mouseover', function(){
    d3.select(this)
    .attr('fill', 'red')
    .attr('cursor','pointer')})
  .on('mouseout',function(){
    d3.select(this)
    .attr('fill','violet')
  })
}

createCircle(){
  d3.select('svg')
  .append('circle')
  .attr('cx', 100)
  .attr('cy', 400)
  .attr('r', 50)
  .attr('fill', 'blue')
}



  createBarChart() {
   const data = [
      { category: 'A', value: 10 },
      { category: 'B', value: 20 },
      { category: 'C', value: 15 },
      { category: 'D', value: 30 },
      { category: 'E', value: 4 },
    ];

    // Define chart dimensions
    const width = 400;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Create scales
    const xScale = scaleBand()
      .domain(data.map(d => d.category))
      .range([0, chartWidth])
      .padding(0.1);

    const yScale = scaleLinear()
      .domain([0, Math.max(...data.map(d => d.value))])
      .range([chartHeight, 0]);

    // Create SVG element
    const svg = select(this.elementRef.nativeElement)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Append and position bars
    svg.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.category)!)
      .attr('y', d => yScale(d.value))
      .attr('width', xScale.bandwidth())
      .attr('height', d => chartHeight - yScale(d.value));

    // Add names to bars
    svg.selectAll('.bar-label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'bar-label')
      .attr('x', d => xScale(d.category)! + xScale.bandwidth() / 2)
      .attr('y', d => yScale(d.value) - 5)
      .attr('text-anchor', 'middle')
      .text(d => d.value.toString());

    // Add y-axis label
    svg.append('text')
      .attr('class', 'axis-label')
      .attr('transform', 'rotate(-90)')
      .attr('x', -chartHeight / 2)
      .attr('y', -margin.left)
      .attr('dy', '1em')
      .attr('text-anchor', 'middle')
      .text('Values');
  }
  // /

  //values bar chart
    private data = [
    {"Framework": "HTML", "Stars": "166443", "Released": "2014"},
    {"Framework": "React", "Stars": "150793", "Released": "2013"},
    {"Framework": "Angular", "Stars": "62342", "Released": "2016"},
    {"Framework": "CSS", "Stars": "27647", "Released": "2010"},
    {"Framework": "Type script", "Stars": "21471", "Released": "2011"},
  ];
  private svg: any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 4);

private createSvg(): void {
    this.svg = d3.select("figure#bar")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
}
private drawBars(data: any[]): void {
  // Create the X-axis band scale
  const x = d3.scaleBand()
  .range([0, this.width])
  .domain(data.map(d => d.Framework))
  .padding(0.2);

  // Draw the X-axis on the DOM
  this.svg.append("g")
  .attr("transform", "translate(0," + this.height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
  .attr("transform", "translate(-10,0)rotate(-45)")
  .style("text-anchor", "end");


  // Create the Y-axis band scale
  const y = d3.scaleLinear()
  .domain([0, 200000])
  .range([this.height, 0]);

  // Draw the Y-axis on the DOM
  this.svg.append("g")
  .call(d3.axisLeft(y));

  // Create and fill the bars
  this.svg.selectAll("bars")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", (d: any) => x(d.Framework))
  .attr("y", (d: any) => y(d.Stars))
  .attr("width", x.bandwidth())
  .attr("height", (d: any) => this.height - y(d.Stars))
  .attr("fill", "purple");


}


}
