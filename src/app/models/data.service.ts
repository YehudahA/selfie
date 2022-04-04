import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Config, Frame } from "./config";

@Injectable({ providedIn: 'root' })
export class DataService {
    constructor(private readonly http: HttpClient) { }

    getConfig(): Observable<Config> {
        return this.http.get<any>('https://test.urban-digital.co.il:7012/DeviceParameterValues/Parameters?deviceId=1618')
            .pipe(map(res => {
                res.selfie.frames.forEach((element: Frame) => {
                    element.fullPath = 'https://test.urban-digital.co.il:7012/customDataFiles/' + element.frame;
                });
                return res.selfie;
            }));

    }
}