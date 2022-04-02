import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageDesignerComponent } from './image-designer/image-designer.component';
import { Config } from './models/config';
import { DataService } from './models/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  stage: Stage = Stage.start;
  @ViewChild(ImageDesignerComponent) imageDesigner!: ImageDesignerComponent;

  readonly config$: Observable<Config>;
  selectedFrame: HTMLImageElement | null = null;
  picture: HTMLImageElement | null = null;
  email: string | null = null;

  constructor(dataService: DataService) {
    this.config$ = dataService.getConfig();
  }

  onSelectFrame(f: HTMLImageElement) {
    this.selectedFrame = f;

    if (this.stage == Stage.start) {
      this.stage = Stage.shoot;
    }
  }


  onImageCaptured(picture: HTMLImageElement) {
    this.picture = picture;
    this.stage = Stage.actions;
  }

  send() {
    if (AppComponent.validateEmail(this.email!)) {
      console.log({
        image: this.imageDesigner.getPicture(),
        email: this.email
      });

      this.stage = Stage.confirmation;
    }
    else {
      this.stage = Stage.emailValidation;
    }
  }

  shoot() {
    this.stage = Stage.shoot;
  }

  inputEmail() {
    this.stage = Stage.email;
  }

  return() {
    this.stage = Stage.actions;
  }

  get title() {
    switch (this.stage) {
      case Stage.start:
        return 'בחירת מסגרת';
      case Stage.shoot:
        return 'צילום';
      case Stage.actions:
        return 'בחירת פעולה';
      case Stage.email:
        return 'כתובת דואר אלקטרוני';
      case Stage.emailValidation:
        return 'הכתובת שגויה. הקלד שנית';
      case Stage.confirmation:
        return 'נשלחה';
      case Stage.error:
        return 'שגיאה. נסה שנית';
    }
  }

  static validateEmail(email: string) {
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regexp.test(email);
  }
}

enum Stage {
  start = 0,
  shoot = 1,
  actions = 2,
  email = 3,
  emailValidation = 4,
  error = 5,
  confirmation = 6
}

