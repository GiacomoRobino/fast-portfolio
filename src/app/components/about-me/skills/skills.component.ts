import { AfterViewInit, Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements AfterViewInit {
  @ViewChild('svgElement', {static: true}) canvas: any;
  public width = 640;
  public height = 480;
  public graph ={
    "nodes": [
      {"id": "Myriel", "group": 1},
      {"id": "Napoleon", "group": 2}],
      "links": [
        {"source": "Napoleon", "target": "Myriel", "value": 1}]};

  public links = [
    { source: 0, target: 1 }
];

  public context: any;
  public simulation: any;

  constructor(private renderer: Renderer2){           
  }
  
  ngAfterViewInit(): void {
    this.canvas = <HTMLCanvasElement>document.querySelector('canvas');
    this.context = this.canvas.getContext("2d");
    this.simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d: any) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(this.width / 2, this.height / 2));
    this.simulation
      .nodes(this.graph.nodes)
      .on("tick", () => {
        this.context.clearRect(0, 0, this.width, this.height);
    
        this.context.beginPath();
        this.graph.links.forEach((d:any) => {
          this.context.moveTo(d.source.x, d.source.y);
          this.context.lineTo(d.target.x, d.target.y);
        });
        this.context.strokeStyle = "#baf5b5";
        this.context.stroke();
    
        this.context.beginPath();
        this.graph.nodes.forEach((d: any) => {
          this.context.moveTo(d.x + 3, d.y);
          this.context.arc(d.x, d.y, 3, 0, 2 * Math.PI);
         });
        this.context.fill();
        this.context.strokeStyle = "#baf5b5";
        this.context.stroke();
      });

    this.simulation.force("link")
      .links(this.graph.links);

  d3.select(this.canvas)
      .call(d3.drag()
          .container(this.canvas)/*
          .subject(this.dragsubject)
          .on("start", this.dragstarted)
          .on("drag", this.dragged)
          .on("end", this.dragended)*/
          );

  
  }

   ticked() {
    this.context.clearRect(0, 0, this.width, this.height);

    this.context.beginPath();
    this.graph.links.forEach((d:any) => {
      this.context.moveTo(d.source.x, d.source.y);
      this.context.lineTo(d.target.x, d.target.y);
    });
    this.context.strokeStyle = "#baf5b5";
    this.context.stroke();

    this.context.beginPath();
    this.graph.nodes.forEach((d: any) => {
      this.context.moveTo(d.x + 3, d.y);
      this.context.arc(d.x, d.y, 3, 0, 2 * Math.PI);
     }
    );
    this.context.fill();
    this.context.strokeStyle = "#baf5b5";
    this.context.stroke();
  }
  /*

   dragsubject() {
    return this.simulation.find(d3.event.x, d3.event.y);
  }


 dragstarted() {
  if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
  d3.event.subject.fx = d3.event.subject.x;
  d3.event.subject.fy = d3.event.subject.y;
}

 dragged() {
  d3.event.subject.fx = d3.event.x;
  d3.event.subject.fy = d3.event.y;
}

 dragended() {
  if (!d3.event.active) this.simulation.alphaTarget(0);
  d3.event.subject.fx = null;
  d3.event.subject.fy = null;
}

}*/
 drawLink(d:any) {
  this.context.moveTo(d.source.x, d.source.y);
  this.context.lineTo(d.target.x, d.target.y);
}

 drawNode(d: any) {
  this.context.moveTo(d.x + 3, d.y);
  this.context.arc(d.x, d.y, 3, 0, 2 * Math.PI);
 }

}
