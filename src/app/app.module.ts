import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackgroundComponent } from './components/background/background.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { ContactMeComponent } from './components/contact-me/contact-me.component';
import { IntroductionComponent } from './components/introduction/introduction.component';
import { FooterComponent } from './components/footer/footer-container/footer-container.component';
import { ParticleCanvasComponent } from './components/particle-canvas/particle-canvas.component';
import { SkillContainerComponent } from './components/footer/footer-container/skill-container/skill-container.component';

@NgModule({
  declarations: [
    AppComponent,
    BackgroundComponent,
    AboutMeComponent,
    ContactMeComponent,
    IntroductionComponent,
    FooterComponent,
    ParticleCanvasComponent,
    SkillContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }