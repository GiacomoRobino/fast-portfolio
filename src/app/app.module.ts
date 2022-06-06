import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BackgroundComponent } from './components/background/background.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { ContactMeComponent } from './components/contact-me/contact-me.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { FooterComponent } from './components/footer/footer-container/footer-container.component';
import { ParticleCanvasComponent } from './components/particle-canvas/particle-canvas.component';
import { SkillContainerComponent } from './components/footer/footer-container/skill-container/skill-container.component';

@NgModule({
  declarations: [
    AppComponent,
    BackgroundComponent,
    AboutMeComponent,
    ContactMeComponent,
    ProjectsComponent,
    FooterComponent,
    ParticleCanvasComponent,
    SkillContainerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
