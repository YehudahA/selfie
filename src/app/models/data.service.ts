import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Config } from "./config";

@Injectable({ providedIn: 'root' })
export class DataService{
    getConfig() : Observable<Config>{
        return of({
            frames: [
                '../assets/frames/wood.jpg',
                '../assets/frames/green.jpg',
                '../assets/frames/gold2.png',
                '../assets/frames/gold.jpg',
                '../assets/frames/blue.jpg'
            ]
        });
    }
}