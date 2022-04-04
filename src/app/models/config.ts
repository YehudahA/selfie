export interface Config {
    frames: Frame[];
    timer: number;
}

export interface Frame {
    frame: string;
    width: number;
    fullPath: string;
}