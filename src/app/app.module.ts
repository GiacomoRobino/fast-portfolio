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
import { ProjectPreviewComponent } from './components/projects/project-preview/project-preview.component';
import { JobCardComponent } from './components/about-me/job-card/job-card.component';
import { SocialCardComponent } from './components/contact-me/social-card/social-card.component';
import { StudyCardComponent } from './components/about-me/study-card/study-card.component';

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
    ProjectPreviewComponent,
    JobCardComponent,
    SocialCardComponent,
    StudyCardComponent,
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
