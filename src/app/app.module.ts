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
import { MailContainerComponent } from './components/contact-me/mail-container/mail-container.component';
import { DirectMessageComponent } from './components/contact-me/direct-message/direct-message.component';
import { AnimatedBorderButtonComponent } from './components/common-components/animated-border-button/animated-border-button.component';
import { CopyMailComponent } from './components/contact-me/copy-mail/copy-mail.component';
import { WriteMailComponent } from './components/contact-me/write-mail/write-mail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LinkedinLinkComponent } from './components/contact-me/linkedin-link/linkedin-link.component';
import { SkillsComponent } from './components/about-me/skills/skills.component';
import { BlogComponent } from './components/blog/blog/blog.component';
import { BlogHeaderComponent } from './components/blog/blog/blog-header/blog-header.component';

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
    MailContainerComponent,
    DirectMessageComponent,
    AnimatedBorderButtonComponent,
    CopyMailComponent,
    WriteMailComponent,
    LinkedinLinkComponent,
    SkillsComponent,
    BlogComponent,
    BlogHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
