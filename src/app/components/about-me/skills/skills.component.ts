import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  public width = 640;
  public height = 480;
  public nodes = [
    { x:   this.width/3, y: this.height/2 },
    { x: 2*this.width/3, y: this.height/2 }
];
  public links = [
    { source: 0, target: 1 }
];

  public svg: any;
  ngOnInit(): void {
    const  svg = d3.select('svg')
    const force = d3.forceSimulation(this.nodes)

    const link = svg.selectAll('.link')
    .data(this.links)
    .enter().append('line')
    .attr('class', 'link');

    const node = svg.selectAll('.node')
    .data(this.nodes)
    .enter().append('circle')
    .attr('class', 'node');

    const meWidth = this.width;

    force.on('end', function() {
  
      node.attr('r', meWidth/25)
          .attr('cx', function(d) { return d.x; })
          .attr('cy', function(d) { return d.y; });
  
      link.attr('x1', function(d: any) { return d.source.x; })
          .attr('y1', function(d: any) { return d.source.y; })
          .attr('x2', function(d: any) { return d.target.x; })
          .attr('y2', function(d: any) { return d.target.y; });
  
  });
  force.restart();
  }


}
