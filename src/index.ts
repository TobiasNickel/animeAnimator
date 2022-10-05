import anime, { AnimeTimelineInstance } from 'animejs';

type TTimeStamp = {
    name:string, time: number
};

export type TAnimationDescription = {
    size: {width: number, height: number},
    animations: ({ id:string, timestamp?: string } & anime.AnimeAnimParams)[],
    elements:({id: string, tagName?:string }&any)[],
}

type AnimeAnimatorOptions = {
    controls?: boolean;
    autoplay?: boolean;
    useKeyframes?: boolean;
}

export class AnimeAnimator {
    public parent: HTMLElement;
    public container: HTMLElement;
    public timeline: AnimeTimelineInstance;
    public originalAnimationDescription: TAnimationDescription;
    public animationDescription: TAnimationDescription;
    public controls: Element;
    public elementsById: {[x: string]: any};
    public playButton: HTMLElement;
    public rangeSlider: HTMLInputElement | any;
    public timeDisplay: HTMLElement;
    public options: AnimeAnimatorOptions;
    public timestamps: TTimeStamp[];
    public playFragment: boolean;
    public lastUpdate: number;
    public timestampSelect: HTMLSelectElement;
    
    constructor(parentElement: HTMLElement, animationDescription: TAnimationDescription, options: AnimeAnimatorOptions) {
        this.options = {
            controls: true, autoplay: false, useKeyframes: false,
            ... (options || {controls: true, autoplay: false })
        };
        this.playFragment = false;
        this.parent = parentElement
        this.container = document.createElement('div');
        this.container.classList.add('animeAnimatorInnerContainer')
        this.parent.appendChild(this.container);
        this.originalAnimationDescription = JSON.parse(JSON.stringify(animationDescription));
        this.animationDescription = this._scale();
        if(window.getComputedStyle(this.parent).position === 'static'){
            this.parent.style.position = 'relative';
        }
        this.parent.classList.add('animeAnimatorContainer');
        this.initTimeline();
        this.animationDescription = this._scale();
        this.initElements();


        this._addAnimations(this.animationDescription.animations);
        this.timeline.pause();

        var lastResize=0;
        window.addEventListener('resize', ()=>{
            const now = Date.now();
            if(now-lastResize>100){
                this.resize()
                lastResize = now;
            }
        });
        this.createControls();
        this.container.append(this.controls);
        if(this.options.autoplay){
            this.timeline.play();
            this.playButton.classList.remove('play')
            this.playButton.classList.add('pause')
        }
    }
    initElements(){
        const initTL = anime.timeline({
            easing: 'linear',
            duration:0,
        });
        this.elementsById = {};
        this._createElements(this.animationDescription.elements, this.container, initTL);
    }
    initTimeline(){
        this.timeline = anime.timeline({
            easing: 'easeInOutQuad',
            update: ()=>{
                // todo: handle stop at timestamp
                this.rangeSlider.value = this.timeline.progress/100;
                this.timeDisplay.innerText = `${Math.round((this.timeline.progress/10000)*this.timeline.duration)/10} / ${Math.round(this.timeline.duration/100)/10}`
                if(this.playFragment){
                    const now = this.timeline.progress/100 * this.timeline.duration;
                    for(let i =0;i<this.timestamps.length;i++){
                        const ts = this.timestamps[i];
                        if(ts.time>this.lastUpdate && ts.time<now){
                            this.playFragment = false;
                            this.pause();
                            this.timeline.seek(ts.time);
                            this.timestampSelect.value = ts.time.toString();
                        }
                    }

                    this.lastUpdate = now;
                }
            },
            complete: ()=>{
                if(this.options.autoplay){
                    this.timeline.play();
                }else{
                    this.playButton.classList.remove('pause');
                    this.playButton.classList.add('play');
                }
            },
            duration:0,
        });
    }
    init(){

    }
    resize(){
        const progress = this.timeline.progress * this.timeline.duration*.01;
        Array.from(this.container.children).forEach(e=>e.remove());        
        this.initTimeline();
        this.animationDescription = this._scale();
        this.initElements();
        this._addAnimations(this.animationDescription.animations);
        
        this.container.appendChild(this.controls);
        this.timeline.pause();
        setTimeout(()=>{
            this.timeline.seek(progress)
            console.log({progress});
            if (this.playButton.classList.contains('pause')){ // (this.playButton.innerText === 'pause') {
                this.timeline.play();
            }
        },10);
    }
    createControls(){
        this.controls =  createHTMLElement(`<div class='control'>
        </div>`);
        
        const resetButton = createHTMLElement(`<div id='resetButton' class='button icon reset'></div>`) as HTMLElement;
        const nextButton = createHTMLElement(`<div id='nextButton' class='button icon next'></div>`) as HTMLElement;
        const playButton = createHTMLElement(`<div id='playButton' class='button icon play'></div>`) as HTMLElement;
        const timeDisplay = createHTMLElement(`<div id='controlDisplay'>${this.timeline.duration}</div>`) as HTMLElement;
        const rangeSlider = createHTMLElement(`<input type='range' min='0' max='1' step="0.001" value='0' id='position'>`);
        const timestamps = createHTMLElement(`<select id='timestamps' class=''><option value='0'>timestamps</option></select>`) as HTMLSelectElement;
        this.timestampSelect = timestamps;
        this.timestamps.forEach(ts=>{
            const $ = createHTMLElement(`<option value='${ts.time}' class='button'>${ts.name}</option>`) as HTMLOptionElement
            timestamps.appendChild($);
            console.log('added timestamp');
        });
        timestamps.addEventListener('change',()=>{
            this.pause();
            this.timeline.seek(parseInt(timestamps.value)-1);
        })
            
        this.rangeSlider = rangeSlider as HTMLInputElement;
        this.timeDisplay = timeDisplay;
        this.playButton = playButton as HTMLElement;
        this.controls.appendChild(timeDisplay);
        if(this.timestamps.length){
            this.controls.appendChild(nextButton);
        }
        this.controls.appendChild(playButton);
        this.controls.appendChild(resetButton);
        this.controls.appendChild(rangeSlider);
        if(this.timestamps.length){
            this.controls.appendChild(timestamps);
        }
        
        playButton.addEventListener('click',()=>{
            if (playButton.classList.contains('play')) { // (playButton.innerText === 'play') {
                this.play();
            } else {
                this.pause();
            }
        });
        nextButton.addEventListener('click',()=>{
            this.playNext();
        })
        resetButton.addEventListener('click',()=>{
            this.reset();
        });
        timeDisplay.innerHTML = `${Math.round((this.timeline.progress/10000)*this.timeline.duration)/10} / ${Math.round(this.timeline.duration/100)/10}`;

        rangeSlider.addEventListener('input', ()=>{
            this.timeline.seek((this.rangeSlider.value)*this.timeline.duration);
        });
    }

    play(){
        this.timeline.play();
        // this.playButton.innerText = 'pause';
        this.playButton.classList.remove('play')
        this.playButton.classList.add('pause')
    }
    playNext(){
        this.play();
        this.playFragment = true;
        this.lastUpdate = this.timeline.progress;
    }

    reset(){
        this.timeline.pause();
        this.timeline.seek(0);
    }

    pause(){
        this.timeline.pause();
        // this.playButton.innerText = 'play';
        this.playButton.classList.remove('pause')
        this.playButton.classList.add('play')
    }

    _createElements (elements, parent, initTL) {
        elements.forEach(element => {
            const $ = document.createElement(element.tagName || 'div');
            $.style.position = 'absolute';
            element.$ = $;
            this.elementsById[element.id] = $;
            parent.appendChild($);
            
            const children = element.children;
            delete element.children;
            const content = element.content;
            delete element.content;

            initTL.add({
                targets: $,
                ...element
            });
            children && this._createElements(children, $, initTL)
            content && $.append(content);
        });
    }
    
    /**
     * @param {any[]}animations
     * @param {number}offset
     **/
    _addAnimations(animations, offset = 0) {
        this.timestamps = [];
        animations.forEach(animation => {
            if (Array.isArray(animation)) {
                const startOffset = offset;
                const endTimes = animation.map(a => {
                    if (Array.isArray(a)) {
                        return this._addAnimations(a,startOffset);
                    } else {
                        return this._addAnimation(a, startOffset);
                    }
                });
                const duration = Math.max(...endTimes) - startOffset;
                offset += duration;
            } else {
                offset += this._addAnimation(animation, offset);
            }
        });

        this.timestamps.sort((a,b)=>a.time-b.time);
        return offset;
    }

    _addAnimation(animation, offset){
        if(animation.id){
            animation.targets= this.elementsById[animation.id];
            this.timeline.add(animation, offset);
            console.log('animation added');
        }
        if(animation.timestamp){
            this.timestamps.push({name: animation.timestamp, time: offset + (animation.duration|0)})
        }
        return animation.duration || 0;
    }

    _scale(){
        const clone = JSON.parse(JSON.stringify(this.originalAnimationDescription));
        const containerSize = { width: this.parent.offsetWidth, height: this.parent.offsetHeight };
        const animationSize = clone.size;
        const widthRatio = containerSize.width/animationSize.width;
        const heightRatio = containerSize.height/animationSize.height;
        const minRatio = Math.min(widthRatio, heightRatio);
        const newAnimationSize = {width: animationSize.width*minRatio, height: animationSize.height*minRatio};
        const offsets = {left:0,top:0};//{left:(containerSize.width-newAnimationSize.width)/2, top: (containerSize.height-newAnimationSize.height)/2}
        this.container.style.height = newAnimationSize.height+'px';
        this.container.style.width = newAnimationSize.width+'px';
        this.container.style.top = (containerSize.height-newAnimationSize.height) / 2 + 'px';
        this.container.style.left = (containerSize.width-newAnimationSize.width) / 2 + 'px';

        scale(clone.elements, true);
        scale(clone.animations, true);
        function scale(element, root=false){
            if (Array.isArray(element)) {
                element.forEach(e=>scale(e,root));
            }
            if(typeof element !== 'object') {
                return;
            }
            if(element.children){
                scale(element.children);
            }
            if(typeof element.top !== 'undefined'){
                if(typeof element.top === 'string'){
                    if(element.top.startsWith('+=')){
                        element.top = '+='+(parseFloat(element.top.substr(2))*minRatio)
                    }else if(element.top.startsWith('-=')){
                        element.top = '-='+(parseFloat(element.top.substr(2))*minRatio)
                    }
                }else if(typeof element.top==='number'){
                    element.top=(element.top*minRatio) + (root ? offsets.top: 0);
                }
            }
            if(typeof element.left !== 'undefined'){
                if(typeof element.left === 'string'){
                    if(element.left.startsWith('+=')){
                        element.left = '+='+(parseFloat(element.left.substr(2))*minRatio)
                    }else if(element.left.startsWith('-=')){
                        element.left = '-='+(parseFloat(element.left.substr(2))*minRatio)
                    }
                }else if(typeof element.left==='number'){
                    element.left=(element.left*minRatio) +  (root ? offsets.left: 0);
                }
            }
            if(typeof element.width !== 'undefined'){
                if(typeof element.width === 'string'){
                    if(element.width.startsWith('+=')){
                        element.width = '+='+(parseFloat(element.width.substr(2))*minRatio)
                    }else if(element.width.startsWith('-=')){
                        element.width = '-='+(parseFloat(element.width.substr(2))*minRatio)
                    }
                }else if(typeof element.width==='number'){
                    element.width=element.width*minRatio;
                }
            }
            if(typeof element.height !== 'undefined'){
                if(typeof element.height === 'string'){
                    if(element.height.startsWith('+=')){
                        element.height = '+='+(parseFloat(element.height.substr(2))*minRatio)
                    }else if(element.height.startsWith('-=')){
                        element.height = '-='+(parseFloat(element.height.substr(2))*minRatio)
                    }
                }else if(typeof element.height==='number'){
                    element.height=element.height*minRatio;
                }
            }
            if(typeof element.fontSize !== 'undefined'){
                if(typeof element.fontSize === 'string'){
                    if(element.fontSize.startsWith('+=')){
                        element.fontSize = '+='+(parseFloat(element.fontSize.substr(2))*minRatio)
                    }else if(element.fontSize.startsWith('-=')){
                        element.fontSize = '-='+(parseFloat(element.fontSize.substr(2))*minRatio)
                    }
                }else if(typeof element.fontSize==='number'){
                    element.fontSize=element.fontSize*minRatio;
                }
            }
        }
        console.log({widthRatio, heightRatio, minRatio,offsets, newAnimationSize, clone});
        return clone;
    }
}
export function createHTMLElement(html: string) {
    const $ = document.createElement('div');
    $.innerHTML = html;
    return $.children[0];
}

document.head.appendChild(createHTMLElement(`<style>
.animeAnimatorContainer{
    user-select: none;
    overflow: hidden;
}
    .animeAnimatorContainer .control{
        display: none;
        text-align:right;
    }
    .animeAnimatorInnerContainer:hover .control{
        display: block;
    }
    .animeAnimatorContainer .control{
        position: absolute;
        bottom:10px;
        right: 10px;
        background-color: white;
        border-radius: 3px;
    }
    .animeAnimatorContainer .control .button, .control div{
        text-align: center;
        float: right;
        border: 1px solid lightgrey;
        border-width: 1px 1px 1px 1px;
    }
    .animeAnimatorContainer .control .button:hover{
        background-color: rgb(243, 252, 255);
    }
    .animeAnimatorContainer .control .button{
        height: 1.35em;
        width: 1.35em;
    }
    .animeAnimatorContainer .control #position{
        width:400px;
    }
    .animeAnimatorInnerContainer{
        overflow:hidden;
        position:absolute;
    }
    .animeAnimatorContainer #timestamps{
        height: 2em;
        overflow: scroll;
        display: block;
        float: right;
        border-color:lightgrey;
    }
    .animeAnimatorContainer #controlDisplay{
        min-width:100px;
        height:1.35em;
    }
    .animeAnimatorContainer select{}
    .animeAnimatorContainer .icon{
        background-size: 1.35em;
    }
    .animeAnimatorContainer .icon.play{
        background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-play'%3E%3Cpolygon points='5 3 19 12 5 21 5 3'%3E%3C/polygon%3E%3C/svg%3E");
    }
    .animeAnimatorContainer .icon.pause{
        background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-pause'%3E%3Crect x='6' y='4' width='4' height='16'%3E%3C/rect%3E%3Crect x='14' y='4' width='4' height='16'%3E%3C/rect%3E%3C/svg%3E");
    }
    .animeAnimatorContainer .icon.next{
        background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-terminal'%3E%3Cpolyline points='4 17 10 11 4 5'%3E%3C/polyline%3E%3Cline x1='12' y1='19' x2='20' y2='19'%3E%3C/line%3E%3C/svg%3E");
    }
    .animeAnimatorContainer .icon.reset{
        background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-skip-back'%3E%3Cpolygon points='19 20 9 12 19 4 19 20'%3E%3C/polygon%3E%3Cline x1='5' y1='19' x2='5' y2='5'%3E%3C/line%3E%3C/svg%3E");
    }
</style>`));


export function throttle(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};
  
    var later = function() {
      previous = options.leading === false ? 0 : Date.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
  
    const throttled:any = function() {
      var _now = Date.now();
      if (!previous && options.leading === false) previous = _now;
      var remaining = wait - (_now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = _now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  
    throttled.cancel = function() {
      clearTimeout(timeout);
      previous = 0;
      timeout = context = args = null;
    };
  
    return throttled;
  }

  function normalizeTimestamp(timestamp:  number | TTimeStamp, index: number) : {name: string, time: number} {
      if(typeof timestamp === 'number') {
          return { name: 'timestamp '+ (index+1), time: timestamp };
      }
      return timestamp;
  }
