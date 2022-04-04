import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { take, timer } from 'rxjs';
import { Frame } from '../models/config';

@Component({
  selector: 'app-shooting',
  templateUrl: './shooting.component.html',
  styleUrls: ['./shooting.component.css']
})
export class ShootingComponent implements AfterViewInit {

  @Input() frame!: Frame;
  @Input() timer!: number;

  @Output() stillPicture: EventEmitter<HTMLImageElement> = new EventEmitter<HTMLImageElement>();

  @ViewChild('video') video: ElementRef<HTMLVideoElement> = null!;
  @ViewChild('canvas') emptyCanvas: ElementRef<HTMLCanvasElement> = null!;
  @ViewChild('img') img: ElementRef<HTMLImageElement> = null!;

  timeElapsed: number | null = null;
  frameWidth: string | null = '0';
  
  constructor(private readonly changeDetector : ChangeDetectorRef){}

  ngAfterViewInit() {
    const ratio = this.img.nativeElement.clientWidth / this.img.nativeElement.naturalWidth;
    this.frameWidth = this.frame.width * ratio + 'px';
    this.changeDetector.detectChanges();

    const video = this.video.nativeElement;

    window.navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(stream => {
        video.srcObject = stream;

        timer(0, 1000).pipe(
          take(this.timer)
        ).subscribe({
          next: i => this.timeElapsed = this.timer - i,
          complete: () => this.proccessStillPicture()
        });

      })
      .catch(err => {
        console.error(err);
      });

  }

  proccessStillPicture() {
    const width = this.video.nativeElement.videoWidth,
      height = this.video.nativeElement.videoHeight;

    const canvas = this.emptyCanvas.nativeElement;
    canvas.width = width;
    canvas.height = height;;

    const context = canvas.getContext('2d')!;

    context.drawImage(this.video.nativeElement, 0, 0, width, height);

    const dataUrl = canvas.toDataURL('image/png');

    const image = new Image();
    image.onload = () => this.stillPicture.emit(image);
    image.src = dataUrl;
  }

}
