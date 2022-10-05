import anime, { AnimeTimelineInstance } from 'animejs';
declare type TTimeStamp = {
    name: string;
    time: number;
};
export declare type TAnimationDescription = {
    size: {
        width: number;
        height: number;
    };
    animations: ({
        id: string;
        timestamp?: string;
    } & anime.AnimeAnimParams)[];
    elements: ({
        id: string;
        tagName?: string;
    } & any)[];
};
declare type AnimeAnimatorOptions = {
    controls?: boolean;
    autoplay?: boolean;
    useKeyframes?: boolean;
};
export declare class AnimeAnimator {
    parent: HTMLElement;
    container: HTMLElement;
    timeline: AnimeTimelineInstance;
    originalAnimationDescription: TAnimationDescription;
    animationDescription: TAnimationDescription;
    controls: Element;
    elementsById: {
        [x: string]: any;
    };
    playButton: HTMLElement;
    rangeSlider: HTMLInputElement | any;
    timeDisplay: HTMLElement;
    options: AnimeAnimatorOptions;
    timestamps: TTimeStamp[];
    playFragment: boolean;
    lastUpdate: number;
    timestampSelect: HTMLSelectElement;
    constructor(parentElement: HTMLElement, animationDescription: TAnimationDescription, options: AnimeAnimatorOptions);
    initElements(): void;
    initTimeline(): void;
    init(): void;
    resize(): void;
    createControls(): void;
    play(): void;
    playNext(): void;
    reset(): void;
    pause(): void;
    _createElements(elements: any, parent: any, initTL: any): void;
    /**
     * @param {any[]}animations
     * @param {number}offset
     **/
    _addAnimations(animations: any, offset?: number): number;
    _addAnimation(animation: any, offset: any): any;
    _scale(): any;
}
export declare function createHTMLElement(html: string): Element;
export declare function throttle(func: any, wait: any, options: any): any;
export {};
