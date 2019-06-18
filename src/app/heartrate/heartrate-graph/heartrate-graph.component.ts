/* tslint:disable:no-string-literal */
import { AfterContentInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivityHeartIntraDay } from '../../api/model/Heartrate';

import * as d3 from 'd3';
import { curveBasis } from 'd3';
import { multiFormat } from './DateFormatter';
import * as Tone from 'tone';

@Component({
  selector: 'app-heartrate-graph',
  templateUrl: './heartrate-graph.component.html',
  styleUrls: ['./heartrate-graph.component.scss']
})
export class HeartrateGraphComponent implements OnInit, AfterContentInit {

  @ViewChild('heartRateGraph')
  private graphContainer: ElementRef<HTMLElement>;

  @Input() activitiesHeartIntraday: ActivityHeartIntraDay;

  private data = [];

  private margin = { top: 10, right: 30, bottom: 30, left: 60 };
  private audioCtx: AudioContext;

  ngOnInit(): void {
    this.audioCtx = new AudioContext();

  }


  ngAfterContentInit(): void {
    this.updateGraph();
  }

  private updateGraph(): void {
    if (!this.activitiesHeartIntraday.dataset) {
      return;
    } else {
      this.data = this.mapDatasetToGraphData();
    }

    this.createGraph();
  }

  private mapDatasetToGraphData(): any {
    return this.activitiesHeartIntraday.dataset.map((dp) => {
      return {
        x: new Date('1970-01-01T' + dp.time + 'Z'),
        y: dp.value
      };
    });
  }

  private createGraph(): void {
    this.deleteSvgFromDom();
    const svg = this.addSvgToDomWithSizeOfGraphContainer(this.graphContainer.nativeElement);

    const contentWidth: number = this.graphContainer.nativeElement.offsetWidth - this.margin.left - this.margin.right;
    const contentHeight = this.graphContainer.nativeElement.offsetHeight - this.margin.top - this.margin.bottom;

    const x = this.createXAxis(contentWidth);
    const y = this.createYAxis(contentHeight);

    svg.append('g')
      .attr('transform', 'translate(0,' + contentHeight + ')')
      .call(d3.axisBottom(x).tickFormat(multiFormat));

    svg.append('g')
      .call(d3.axisLeft(y));

    const path = svg.append('path')
      .datum(this.data)
      .attr('fill', 'none')
      .attr('stroke', '#2F7727')
      .attr('stroke-width', 1)
      .attr('d', d3.line()
        .x((d) => x(d['x']))
        .y((d) => y(d['y']))
        .curve(curveBasis)
      );

    const totalLength = path.node().getTotalLength();

    this.playNoise();

    path
      .attr('stroke-dasharray', totalLength + ' ' + totalLength)
      .attr('stroke-dashoffset', totalLength)
      .transition()
      .duration(this.data.length * 10)
      .ease(d3.easeLinear)
      .attr('stroke-dashoffset', 0);
  }

  private addSvgToDomWithSizeOfGraphContainer(element) {
    return d3.select(element)
      .append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight * 2.5);
  }

  private deleteSvgFromDom(): void {
    d3.select('svg').remove();
  }

  private createXAxis(contentWidth: number): any {
    const [minimum, maximum] = d3.extent(this.data, (dp) => dp.x);
    return d3.scaleTime()
      .domain([minimum, maximum])
      .range([0, contentWidth]);
  }

  private createYAxis(contentHeight: number): any {
    const maximum: number = d3.max(this.data, (dp) => dp.y);
    return d3.scaleLinear()
      .domain([0, maximum])
      .range([contentHeight, 0]);
  }

  private playNoise(): void {
    // create a synth
    const synth = new Tone.MembraneSynth().toMaster();

    // create an array of notes to be played
    const notes: string[] = this.data.map(dp => {
      return new Tone.Frequency(dp['y'], 'midi').toNote();
    });

    console.dir(notes);
    // create a new sequence with the synth and notes
    const synthPart = new Tone.Sequence(
      (time, note) => {
        synth.triggerAttackRelease(note, 1, time);
      },
      notes,
      0.1
    );

    // Setup the synth to be ready to play on beat 1
    synthPart.start(0);

    Tone.Transport.start();

  }
}



