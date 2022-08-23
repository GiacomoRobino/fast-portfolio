import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-copy-mail',
  templateUrl: './copy-mail.component.html',
  styleUrls: ['./copy-mail.component.scss'],
})
export class CopyMailComponent implements OnInit {
  public mail = 'robinogiacomo@gmail.com';
  public mailTextContext = { shownText: '', fullText: "click to copy" };
  private timeToWrite = 1000.0;
  private specialCaractersMultipliers: { [key: string]: number } = {
    '.': 500.0,
    ',': 200.0,
  };
  private interruptWriting = false;

  ngOnInit(){
    this.writeText(this.mailTextContext)
  }
  click(){
    this.cancelText(this.mailTextContext).then(()=> {
      this.mailTextContext.fullText = "mail copied!";
      this.writeText(this.mailTextContext);
    })
    navigator.clipboard.writeText("robinogiacomo@gmail.com");
    
  }

  
  writeText(textContext: any, timeToWrite = -1): any {
    return new Promise<void>((resolve, reject) => {
      if (timeToWrite === -1) {
        timeToWrite = this.timeToWrite / textContext.fullText.length;
        this.interruptWriting = false;
      }
      if (
        textContext.shownText.length < textContext.fullText.length &&
        !this.interruptWriting
      ) {
        textContext.shownText = this.addOneLetter(
          textContext.shownText,
          textContext.fullText
        );
        if (this.specialCaractersMultipliers[textContext.shownText.slice(-1)]) {
          timeToWrite =
            timeToWrite *
            this.specialCaractersMultipliers[textContext.shownText.slice(-1)];
        } else if (
          this.specialCaractersMultipliers[textContext.shownText.slice(-2, -1)]
        ) {
          timeToWrite =
            timeToWrite /
            this.specialCaractersMultipliers[
              textContext.shownText.slice(-2, -1)
            ];
        }
        setTimeout(() => {
          this.writeText(textContext, timeToWrite).then(resolve);
        }, timeToWrite);
      } else {
        resolve();
      }
    });
  }

  addOneLetter(destination: string, source: string) {
    return destination + source.charAt(destination.length);
  }

  cancelText(textContext: any, timeToWrite = -1): any {
    return new Promise<void>((resolve, reject) => {
      if (timeToWrite === -1) {
        timeToWrite = this.timeToWrite / textContext.fullText.length;
        this.interruptWriting = false;
      }
      if (textContext.shownText.length > 0 && !this.interruptWriting) {
        textContext.shownText = this.removeOneLetter(textContext.shownText);
        if (this.specialCaractersMultipliers[textContext.shownText.slice(-1)]) {
          timeToWrite =
            timeToWrite *
            this.specialCaractersMultipliers[textContext.shownText.slice(-1)];
        } else if (
          this.specialCaractersMultipliers[textContext.shownText.slice(-2, -1)]
        ) {
          timeToWrite =
            timeToWrite /
            this.specialCaractersMultipliers[
              textContext.shownText.slice(-2, -1)
            ];
        }
        setTimeout(() => {
          this.cancelText(textContext, timeToWrite).then(resolve);
        }, timeToWrite);
      } else {
        resolve();
      }
    });
  }

  removeOneLetter(text: string) {
    return text.slice(0, -1);
  }
}
