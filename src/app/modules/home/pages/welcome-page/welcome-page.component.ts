import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
// import { INode } from '@app/_core/interfaces/nodes.interface';
import * as d3 from 'd3';
import { Observable, Subscription, fromEvent } from 'rxjs';

interface INode extends d3.SimulationNodeDatum {
  r?: number;
  group?: string;
}
declare const window: any;
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit, OnDestroy {
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;
  resizeObservable$!: Observable<Event>;
  resizeSubscription$!: Subscription;
  width: number = window.innerWidth;

  data: any[] = [];
  constructor() {
    this.generateBallsData();
  }
  private generateBallsData() {
    const k = this.width / 200;
    const r = d3.randomUniform(k, k * 4);
    const n = 4;
    const dataBalls = Array.from({ length: 200 }, (_, i) => ({
      r: r(),
      group: i && (i % n) + 1,
    }));
    this.data = dataBalls;
  }

  ngOnInit(): void {
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe(() => {
      this.width = window.innerWidth;
    });
    const width = window.innerHeight;
    const height = window.innerHeight;
    const canvas = d3
      .select(this.chartContainer.nativeElement)
      .append('canvas');
    canvas.attr('width', width).attr('height', height);
    const context = canvas.node()?.getContext('2d') as CanvasRenderingContext2D;

    const nodes: INode[] = this.data.map((d) => ({
      r: d.r,
      group: d.group,
    })) as INode[];

    const ticked = () => {
      context.clearRect(0, 0, width, height);
      context.save();
      context.translate(width / 2, height / 2);
      for (let i = 1; i < nodes.length; ++i) {
        const d = nodes[i];
        context.beginPath();
        context.moveTo((d.x as number) + (d.r as number), d.y as number);
        context.arc(
          d.x as number,
          d.y as number,
          d.r as number,
          0,
          2 * Math.PI
        );
        context.fillStyle = '#fff';
        context.fill();
      }
      context.restore();
    };
    const pointermoved = (event: any) => {
      console.log(event);
      const [mx, my] = d3.pointer(event);
      nodes[0].fx = mx - width / 2;
      nodes[0].fy = my - height / 2;
      simulation.alpha(1).restart();
    };
    const simulation = d3
      .forceSimulation(nodes)
      .alphaTarget(0.3)
      .velocityDecay(0.1)
      .force('x', d3.forceX().strength(0.01))
      .force('y', d3.forceX().strength(0.01))
      .force('radial', d3.forceRadial(200))
      .force(
        'collide',
        d3
          .forceCollide()
          .radius((d: INode) => d.r! + 0.5)
          .iterations(3)
      )
      .force(
        'charge',
        d3.forceManyBody().strength((_, i) => (i ? 0 : (-width * 2) / 3))
      )
      .on('tick', ticked);

    d3.select(canvas.node())
      .on('pointermoved', pointermoved)
      .on('touchmove', (event) => event.preventDefault());
    simulation.on('end', () => {
      simulation.stop();
    });
  }
  ngOnDestroy(): void {
    this.resizeSubscription$.unsubscribe();
  }
}
