import { Observable, Subscription, fromEvent } from 'rxjs';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import * as d3 from 'd3';

interface INode extends d3.SimulationNodeDatum {
  r?: number;
  originalColor?: string;
  group?: number;
  color?: string;
}
declare const window: any;
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit, OnDestroy {
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;
  @ViewChild('exploreBtn', { static: true }) exploreBtn!: ElementRef;
  resizeObservable$!: Observable<Event>;
  resizeSubscription$!: Subscription;
  height = window.innerHeight;
  width = window.innerWidth;

  simulation: any;
  nodes!: INode[];
  constructor(private router: Router) {
    this.generateBallsData();
  }
  private generateBallsData() {
    const width = window.innerWidth;
    const k = width / 200;
    const r = d3.randomUniform(k, k * 4); // Random angle
    const n = 4;
    const dataBalls = Array.from({ length: 200 }, (_, i) => ({
      r: r(),
      group: i && (i % n) + 1,
      x: Math.cos((i / 200) * Math.PI * 2) * width * 0.4 + width / 2, // Distribute nodes in a circle
      y: Math.sin((i / 200) * Math.PI * 2) * width * 0.4 + width / 2, // Distribute nodes in a circle
    }));
    this.nodes = dataBalls;
  }
  ngOnInit(): void {
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe(() => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    });
    const width = window.innerWidth;
    const height = window.innerHeight;

    const svg = d3
      .select(this.chartContainer.nativeElement)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    this.nodes = this.nodes.map((d, i) => ({
      color: i === 0 ? 'transparent' : '#fff',
      r: d.r,
      x: width / 2, // Initialize x position to the center
      y: height / 2, // Initialize y position to the center
    })) as INode[];

    const nodeElements = svg
      .selectAll('.node')
      .data(this.nodes)
      .enter()
      .append('circle')
      .attr('class', 'node')
      .attr('r', (d) => d.r!)
      .style('fill', (d: INode) => d.color!);

    const ticked = () => {
      nodeElements
        .attr('cx', (d: INode) => d.x!)
        .attr('cy', (d: INode) => d.y!);
    };
    const pointermoved = (event: any) => {
      const [mx, my] = d3.pointer(event);
      this.nodes[0].fx = mx;
      this.nodes[0].fy = my;
      this.simulation.alpha(1).restart();
    };

    this.simulation = d3
      .forceSimulation(this.nodes)
      .alphaTarget(0.3)
      .velocityDecay(0.1)
      .force('x', d3.forceX((d) => d.x!).strength(0.01))
      .force('y', d3.forceY((d) => d.y!).strength(0.01))
      .force(
        'collide',
        d3
          .forceCollide()
          .radius((d: INode) => d.r! + 2)
          .iterations(3)
      )
      .force(
        'charge',
        d3.forceManyBody().strength((d, i) => (i ? 0 : (-width * 2) / 3))
      )
      .on('tick', ticked);

    svg.on('mousemove', pointermoved);
  }

  handleExploreBtnClick() {
    this.exploreBtn.nativeElement.style.opacity = '0';
    this.exploreBtn.nativeElement.style.visibility = 'hidden';

    this.modifyNodesAndAnimate();
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 2500);
  }
  generateColor(d: INode, i: number) {
    switch (i) {
      case 1:
        return 'red';
      case 2:
        return 'green';
      case 3:
        return 'blue';
      default:
        return 'transparent';
    }
  }
  modifyNodesAndAnimate() {
    const svg = d3.select(this.chartContainer.nativeElement).select('svg');

    svg
      .selectAll('.node')
      .filter((d, i) => i >= 4)
      .remove();
    const nodesSelected = svg.selectAll('.node').filter((d, i) => i < 4);

    // Change the color of the nodes, change position and radius. After that, hide the nodes
    nodesSelected
      .transition()
      .duration(2000)
      .attr('r', (d: any) => d.r! * 100)
      .attr('cx', (_, i) => {
        switch (i) {
          case 0:
            return 0;
          case 1:
            return 300;
          case 2:
            return this.width - 100;
          case 3:
            return this.width / 2;
          default:
            return 0;
        }
      })
      .attr('cy', (_, i) => {
        switch (i) {
          case 0:
            return 0;
          case 1:
            return 300;
          case 2:
            return 200;
          case 3:
            return window.innerHeight - 100;
          default:
            return 0;
        }
      })
      .style('fill', (d, i) => this.generateColor(d as INode, i))
      .style('opacity', 0)
      .on('end', () => {
        this.simulation.stop();
        svg.selectAll('.node').remove();
      });
  }

  ngOnDestroy(): void {
    this.resizeSubscription$.unsubscribe();
    this.simulation.stop();
    d3.select(this.chartContainer.nativeElement).selectAll('svg').remove();
  }
}
