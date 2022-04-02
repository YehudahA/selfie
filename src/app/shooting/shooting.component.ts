import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { take, timer } from 'rxjs';

@Component({
  selector: 'app-shooting',
  templateUrl: './shooting.component.html',
  styleUrls: ['./shooting.component.css']
})
export class ShootingComponent implements AfterViewInit {

  @Input() frame!: string;

  @Output() stillPicture: EventEmitter<HTMLImageElement> = new EventEmitter<HTMLImageElement>();

  @ViewChild('video') video: ElementRef<HTMLVideoElement> = null!;
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement> = null!;

  timeElapsed: number | null = null;

  ngAfterViewInit() {
    const video = this.video.nativeElement;

    window.navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(stream => {
        video.srcObject = stream;

        const secondsCounter = 5;

        timer(0, 1000).pipe(
          take(secondsCounter)
        ).subscribe({
          next: i => this.timeElapsed = secondsCounter - i,
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

    const canvas = this.canvas.nativeElement;
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
