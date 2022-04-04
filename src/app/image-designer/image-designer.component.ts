import { AfterContentChecked, AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Frame } from '../models/config';

@Component({
  selector: 'app-image-designer',
  templateUrl: './image-designer.component.html',
  styleUrls: ['./image-designer.component.css']
})
export class ImageDesignerComponent implements AfterViewInit, AfterContentChecked {

  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement> = null!;

  @Input() frame!: Frame;
  @Input() picture!: HTMLImageElement;

  private viewInit = false;

  ngAfterViewInit() {
    this.viewInit = true;
    this.renderCanvas();
  }

  ngAfterContentChecked() {
    if (this.viewInit) {
      this.renderCanvas();
    }
  }

  renderCanvas() {
    const image = new Image();
    const canvas = this.canvas.nativeElement;
    const canvasContext: CanvasRenderingContext2D = canvas.getContext('2d')!;

    image.crossOrigin = "anonymous";

    image.onload = () => {
      const outputWidth = image.width;
      const outputHeight = image.height;
      const frameWidth = this.frame.width;

      canvas.width = outputWidth;
      canvas.height = outputHeight;

      canvasContext.drawImage(image,
        0,
        0,
        outputWidth,
        outputHeight);

      canvasContext.drawImage(this.picture,
        frameWidth,
        frameWidth,
        outputWidth - frameWidth * 2,
        outputHeight - frameWidth * 2);
    }

    image.src = this.frame.fullPath;
  };

  getPicture() {
    const canvas = this.canvas.nativeElement;
    return canvas.toDataURL('image/png');
  }

}
