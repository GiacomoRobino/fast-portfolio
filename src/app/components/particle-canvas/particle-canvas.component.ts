import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { Particle } from './model';

@Component({
  selector: 'app-particle-canvas',
  templateUrl: './particle-canvas.component.html',
  styleUrls: ['./particle-canvas.component.scss'],
})
export class ParticleCanvasComponent implements AfterViewInit {
  @ViewChild('canvas') canvasReference: any;
  @Input() inputOpacity = 0;
  @Input() inputColor !: string;
  @Input() linkRadius = 100;
  public canvas: any;
  public netActivated = true;
  public netType = 'poly';
  public renderedFrames = 0;
  public h = 0;
  public w = 0;
  public loopId = 0;
  public id = 0;
  public ctx: any;
  public particles: any[] = [];
  public options = {
    particleColor: 'rgba(255,255,255)',
    lineColor: this.inputColor,
    particleAmount: 60,
    defaultRadius: 0.1,
    variantRadius: 0.1,
    defaultSpeed: 1,
    variantSpeed: 2,
    linkRadius: this.linkRadius,
  };

  public staticParticleOptions = {
    particleColor: 'rgba(255,255,255)',
    lineColor: this.inputColor,
    particleAmount: 400,
    defaultRadius: 0.5,
    variantRadius: 0.5,
    defaultSpeed: 0,
    variantSpeed: 0,
    linkRadius: 100,
  };

  ngAfterViewInit(): void {
    this.canvas = this.canvasReference.nativeElement;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.w = this.canvas.width;
    this.h = this.canvas.height;
    /*
    window.addEventListener('click', (event) => {
      this.particles.push(
        new Particle(
          event.clientX,
          event.clientY,
          this.staticParticleOptions,
          this.ctx,
          false
        )
      );
    });
    */
    this.ctx = this.canvas.getContext('2d');
    this.initializeElements();
    this.startAnimation();
  }

  reset() {
    this.initializeElements();
    this.startAnimation();
  }

  initializeElements() {
    this.particles = this.particles.filter((x) => !x.value);
    for (let i = 0; i < this.options.particleAmount; i++) {
      this.particles.push(new Particle(this.w, this.h, this.options, this.ctx));
    }
  }

  startAnimation() {
    window.requestAnimationFrame(this.animationLoop.bind(this));
  }

  activateNet() {
    this.netActivated = !this.netActivated;
  }

  animationLoop() {
    this.renderedFrames++;
    this.ctx.clearRect(0, 0, this.w, this.h);
    this.drawScene();
    requestAnimationFrame(this.animationLoop.bind(this));
  }

  drawScene() {
    this.drawLine();
    this.drawParticle();
  }

  drawParticle() {
    for (const particle of this.particles) {
      particle.update();
      particle.draw();
    }
  }

  drawLine() {
    for (const particle of this.particles) {
        this.linkPoints(particle, this.particles);
    }
  }

  linkPoints(point: any, hubs: Particle[]) {
    point.radius = 0.5;
    const particleNeighborsNumber = point.radius;
    for (let i = 0; i < hubs.length; i++) {
      const distance = this.checkDistance(
        point.x,
        point.y,
        hubs[i].x,
        hubs[i].y
      );
      const opacity = this.inputOpacity - distance / this.linkRadius;
      if (opacity > 0) {
        if (this.netActivated && point.valid && hubs[i].valid) {
          this.ctx.lineWidth = 0.5;
          this.ctx.strokeStyle = 'rgba(' + this.inputColor + ', ' + opacity + ')';
          this.ctx.beginPath();
          this.ctx.moveTo(point.x, point.y);
          this.ctx.lineTo(hubs[i].x, hubs[i].y);
          this.ctx.closePath();
          this.ctx.stroke();
        }
      }
    }
    point.radius = particleNeighborsNumber;
  }

  checkDistance(x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
}
