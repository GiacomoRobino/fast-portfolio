import {
  AfterViewInit,
  Component,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const  width = 800;
    const  height = 400;
    const svg = d3.select("#skillsId").append("svg:svg")
    .attr("width", width)
    .attr("height", height)

      const n : any[] = []
      const l : any[] = []

    const graph = {
      nodes: n,
      links : l,
    };

    const simulation = d3
      .forceSimulation()
      .force('center', d3.forceCenter(width / 2, height / 2).strength(0.01))
      .nodes(graph.nodes)
      .force('link', d3.forceLink(graph.links).distance(100))
      .on('tick', function () {
        svg
          .selectAll('.link')
          .attr('x1', function (d: any) {
            return d.source.x;
          })
          .attr('y1', function (d: any) {
            return d.source.y;
          })
          .attr('x2', function (d: any) {
            return d.target.x;
          })
          .attr('y2', function (d: any) {
            return d.target.y;
          });

        svg
          .selectAll('.node')
          .attr('cx', function (d: any) {
            return d.x;
          })
          .attr('cy', function (d: any) {
            return d.y;
          })
          .attr('transform', function (d: any) {
            return 'translate(' + d.x + ',' + d.y + ')';
          });
      })
      .alphaDecay(0.0002); // just added alpha decay to delay end of execution

    function update() {
      // update links
      const link = svg.selectAll('.link').data(graph.links);
      link
        .enter()
        .insert('line', '.node')
        .attr('class', 'link')
        .style('stroke', '#d9d9d9');
      link.exit().remove();

      // update nodes
      const node = svg.selectAll('.node').data(graph.nodes);
      const g = node.enter().append('g').attr('class', 'node');
      const imgSize = 24
      g.append("svg:image")
      .attr('x', -(imgSize/2))
      .attr('y', -(imgSize/2))
      .attr('width', imgSize)
      .attr('height', imgSize)
      .attr("xlink:href",(d:any) => "assets/scalableVectorGraphics/skills/" + d.name + ".svg")

      g.append('text')
        .attr('class', 'text')
        .attr('x', imgSize/2)
        .style('fill', '#d9d9d9')
        .text(function (d: any) {
          return d.name;
        })
        .on("mouseover", (d:any) => console.log(d.srcElement.innerHTML))
        ;
      node.exit().remove();

      // update simulation
      simulation
        .nodes(graph.nodes)
        .force('link', d3.forceLink(graph.links).distance(100))
        .force('charge', d3.forceManyBody().strength(-10))
        .restart();
    }

    function addNode(node: any) {
      graph.nodes.push(node);
      update();
    }

    function connectNodes(source : any, target: any) {
      graph.links.push({
        source: source,
        target: target,
      });
      update();
    }

    

    addNode({
      id: 0,
      name: "javascript",
    });

    addNode({
      id: 1,
      name: "angular",
    });

    addNode({
      id: 2,
      name: "css3"
    });

    addNode({
      id: 3,
      name: "d3js"
    });

    addNode({
      id: 4,
      name: "typescript",
    });

    addNode({
      id: 5,
      name: "greensock",
    });

    addNode({
      id: 6,
      name: "html",
    });

    addNode({
      id: 7,
      name: "rxjs",
    });

    addNode({
      id: 8,
      name: "github",
    });

   
    
    connectNodes(0, 1);
    connectNodes(4, 1);
    connectNodes(4, 8);
    connectNodes(0, 3);
    connectNodes(0, 5);
    connectNodes(0, 6);
    connectNodes(0, 2);
    connectNodes(7, 1);



  }
}
