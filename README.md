# AnimeAnimator

Declarative animations using anime js.

Anime js is a nice animation library, that allows to do some impressive animations. However when building animation sequences, I found it difficult to keep track of delay when using its '.add' method. And when deciding to add a new entry animation or delay, that meant to go though the entire animation and update all offset values so that each animation run at the correct time in a timeline.

With this library, you can write entire animations in JSON. Or you use JS, to help you keep your animation definition more organized.

## how did it came to this library?
I used a number of tools for creating animations. very simple gif animations in gimp, with very few frames. because in gimp each frame is a layer and that gets very unhandy. With Aseprite, a tool for pixel graphics and animations, it is possible to have layers as well as a timeline of frames. Using this tool, I created a quite complex animation to illustrate how web push works. The style of this animation looks quite cool. I tried a Video Cutting software, but its focus on adding effects and less on doing animations made it very little effective for my use cases. For presenting a technical concept in a presentation using google slides, I created for each frame a new slide. This works, it has its own charm, but it needs good planning ahead how the animation should look like. because when finding afterwards that a change is needed, that means basically to start over or update all slides. A quite simple animation I made with it, had 400 slides. The presentation was a success, But I spend a number of evenings to get the animation work.

So at some point I wanted to try to code an animation. I decided to code the same animation I made using the slides. After trying MoJS I ended up with AnimeJS because of its awesome timeline feature. And it turned out, I was able to implement a first prototype of a declarative animator plus  the animation itself, And it took me less than half the time of creating each frame. Also once I have the animation is running, I can just record my screen and generate a video or animated gif file if that is needed.

## Features
 - declarative animations
 - delay / pause within animations
 - concurrent animations
 - timeline controls (optional and mostly direct from anime js)
 - auto scale / resize (define your animation lets say for 1080p but display it in a smaller space within a presentation or article.)
 - autoplay in a loop
 - timestamps

## non features
I want to help you to size up if this library is good for you.
 - interactive animations: This library is to make animations more like a video, no games or simulations. You are able to manually attach event handlers on elements, but you have to be careful updating the timeline.
 - rigged skeletons: For that you want to look at spine animations.

## future feature ideas:
 - breakpoints or timestamp and controls that allow the user to skip and play only a part of an animation similar to slides. So that between animation steps some text can be displayed or extra information can be given to the audience.(partial implemented)
 - play audio along side the animation, for sound effects and text. Maybe even support audio sprites. Maybe using howler.js, but I am not sure if this lib should be included.

## how to define animations using AnimeAnimator
tldr: you create a javascript object (maybe from json) that has a `size` with `width` and `height`. A list of `element` that have a tag name, and properties for the css style as well as an `id`. An `animations` array, where each animation has the `id` of one of the elements, and the properties that the element should animate to. Each animation object also has `duration` in milliseconds. An animation can also only have a duration. That is useful to have a break within the animation. Using nested Arrays, it is possible to have multiple element animations run concurrently. Next I will show you a few examples that will make the animation description structure very clear.

## Examples
### move a square from left to right
```js
const animationDefinition = {
    size: { width: 640, height: 420 },
    elements:[
        { id: 'square1', width: 10, height: 10, left: 0, top: 200, backgroundColor: '#55f' },
    ],
    animations:[
        { id: 'square1', left: 600, duration: 1000 }, // move square1 within 1 second to the left side
        { id: 'square1', scale: 2, duration: 300 }, // then make square1 within 0.3s twice as big
        { id: 'square1', left: 600, duration: 500 }, // then move square1 within 0.5s back
        { duration: 500 }, // wait half a second
        { id: 'square1', scale: 1, duration: 300 }, // scale back to original size
    ],
};
new AnimeAnimator(animationDefinition, document.getElementById('playground'));
```
In this example you see a that css properties are used to define the scene with elements. feel free to give them an initial `opacity: 0` to make them invisible in the beginning of the animation. You can also change an elements property abrupt by adding an animation with `duration: 0`.

In the example you see, that we give an element the `id: "square1"`. Within the animation, the `id` property is not identifying the animation step, but the element that is meant to me changed.

### animate two squares at once
```js
function animateSquare(id){
    return [
        { id, left: 600, duration: 1000 }, // move square1 within 1 second to the left side
        { id, scale: 2, duration: 300 }, // then make square1 within 0.3s twice as big
        { id, left: 600, duration: 500 }, // then move square1 within 0.5s back
        { duration: 500 }, // wait half a second
        { id, scale: 1, duration: 300 }, // scale back to original size
    ];
}

const animationDefinition = {
    size: { width: 640, height: 420 },
    elements:[
        { id: 'square1', width: 10, height: 10, left: 0, top: 200, backgroundColor: '#55f' },
        { id: 'square2', width: 10, height: 10, left: 0, top: 300, backgroundColor: '#55f' },
    ],
    animations: [
        [
            animateSquare('square1'),
            animateSquare('square2'),
        ]
    ]
};
new AnimeAnimator(animationDefinition, document.getElementById('playground'));
```
In this example you can see that using JS it is easy to construct an animation using different sequences. Also, you see nested arrays. in fact, you can see three levels of nested arrays. the most outer animation array is the main timeline. The next is there, so that all its animations are supposed to run at the same time. At least they will start at the same time. The function `animateSquare` also return an array of animations. These animations objects will run in sequence again. Within the animateSquare function, you could also have again nested arrays. This works recursive so that it is possible to compose very complex animations out of prepared animation blocks. and it always starts with one layer sequence, then one layer concurrent, then one sequence,... concurrent, sequence, concurrent, sequence and so forth.

### animate other things than rectangles
```js
const animationDefinition = {
    size: { width: 640, height: 420 },
    elements:[
        { id: 'image', width: 10, height: 10, left: 0, top: 200, content: createHTMLElement(`<img src="path/to/img.jpg">`) },
        { id: 'line', width: 100, height: 1, left: 0, top: 300, backgroundColor: '#000' },
    ],
    animations,
};
```
Using the elements `content` property you can add images text and other stuff to the animation. 


## timestamps are a convenience feature