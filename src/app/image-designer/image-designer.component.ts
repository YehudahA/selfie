import { AfterViewChecked, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-image-designer',
  templateUrl: './image-designer.component.html',
  styleUrls: ['./image-designer.component.css']
})
export class ImageDesignerComponent implements AfterViewChecked {

  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement> = null!;

  @Input() frame!: HTMLImageElement;
  @Input() picture!: HTMLImageElement;

  ngAfterViewChecked() {
    const outputWidth = 500;
    const outputHeight = 400;
    const frameWidth = 60;

    const canvas = this.canvas.nativeElement;

    canvas.width = outputWidth;
    canvas.height = outputHeight;

    const canvasContext: CanvasRenderingContext2D = canvas.getContext('2d')!;

    canvasContext.drawImage(this.frame,
      0,
      0,
      outputWidth,
      outputHeight);

    canvasContext.drawImage(this.picture,
      frameWidth,
      frameWidth,
      outputWidth - frameWidth * 2,
      outputHeight - frameWidth * 2);

  };

  getPicture() {
    const canvas = this.canvas.nativeElement;
    return canvas.toDataURL('image/png');
  }

}
