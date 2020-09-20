# declarative-canvas
[![npm version](https://badge.fury.io/js/declarative-canvas.svg)](https://www.npmjs.com/package/declarative-canvas)

JavaScript/TypeScript library which lets you draw on HTML5 Canvas in a declarative way.

## Installation
```
npm install declarative-canvas
```

## Example Usage
The following code draws a rectangle and a circle on a canvas.
```js
import { createDrawFunction, objectTypes } from 'declarative-canvas';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const objectsToRender = [
  { type: objectTypes.RECT, x: 50, y: 100, width: 200, height: 100 },
  { type: objectTypes.CIRCLE, x: 200, y: 100, radius: 100 },
];

const draw = createDrawFunction();

draw({ context, objects: objectsToRender });
```

## Storybook
More examples can be found in the [storybook](https://lukix.github.io/declarative-canvas). Source code of storybook stories is placed in the [src/stories](./src/stories) directory.

## API Reference
`declarative-canvas` exports three objects/functions:
- `createDrawFunction` - draw function factory,
- `objectTypes` - dictionary object of available object types which can be drawn,
- `drawMethods` - dictionary object of available drawing methods.

### createDrawFunction
A factory function that takes one optional argument:
```ts
(customDrawHandlers = {}) => Function
```
`customDrawHandlers` argument is described in [Custom draw handlers](#custom-draw-handlers) chapter.

A function returned from this factory has the following signature:

```ts
({
  context: CanvasRenderingContext2D,
  objects: Array<object>,
  canvasWidth = context.canvas && context.canvas.width,
  canvasHeight = context.canvas && context.canvas.width,
  camera = { position: { x: canvasWidth / 2, y: canvasHeight / 2 }, zoom: 1 },
}) => void
```

### objectTypes
```js
{
  CIRCLE: 'CIRCLE',
  PATH: 'PATH',
  IMAGE: 'IMAGE',
  TEXT: 'TEXT',
  RECT: 'RECT',
  TRANSFORM: 'TRANSFORM',
}
```

### drawMethods
```js
{
  FILL: 'FILL',
  STROKE: 'STROKE',
  FILL_AND_STROKE: 'FILL_AND_STROKE',
}
```
Draw method tells the renderer if the given graphical object should be drawn by filling it with some color
or just by drawing its outline (or both).

## Available graphical objects

### Rectangle
```ts
{
  type: objectTypes.RECT;
  contextProps?: Partial<CanvasRenderingContext2D>;
  drawMethod?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
}
```
`contextProps` - [Canvas context props](#Context-Props). *Default: `{}`*  
`drawMethod` - [Draw method](#drawMethods). *Default: `drawMethods.FILL`*  
`x` - position of the center of rectangle in X axis  
`y` - position of the center of rectangle in Y axis  
`width` - rectangle width  
`height` - rectangle height  
`rotation` - rectangle rotation in radians. *Default: `0`* 


### Circle
```ts
{
  type: objectTypes.CIRCLE;
  contextProps?: Partial<CanvasRenderingContext2D>;
  drawMethod?: string;
  x: number;
  y: number;
  radius: number;
}
```
`contextProps` - [Canvas context props](#Context-Props). *Default: `{}`*  
`drawMethod` - [Draw method](#drawMethods). *Default: `drawMethods.FILL`*  
`x` - position of the center of circle in X axis  
`y` - position of the center of circle in Y axis  
`radius` - circle radius

### Path
```ts
{
  type: objectTypes.PATH;
  contextProps?: Partial<CanvasRenderingContext2D>;
  drawMethod?: string;
  points: Array<{ x: number; y: number }>,
  closePath?: boolean,
}
```
`contextProps` - [Canvas context props](#Context-Props). *Default: `{}`*  
`drawMethod` - [Draw method](#drawMethods). *Default: `drawMethods.FILL`*  
`points` - array of points that make the path  
`closePath` - indicates if the last point should be connected to the first point. *Default: `false`*  

### Image
```ts
{
  type: objectTypes.IMAGE;
  contextProps?: Partial<CanvasRenderingContext2D>;
  image
  x: number;
  y: number;
  width?: number;
  height?: number;
  rotation?: number;
}
```
`contextProps` - [Canvas context props](#Context-Props). *Default: `{}`*  
`image` - [Image](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image) object  
`x` - position of the center of image in X axis  
`y` - position of the center of image in Y axis  
`width` - image width. *Defaults to image orginal width*  
`height` - image height. *Defaults to image orginal height*    
`rotation` - image rotation in radians. *Default: `0`*  

### Text
```ts
{
  type: objectTypes.TEXT;
  contextProps?: Partial<CanvasRenderingContext2D>;
  drawMethod?: string;
  text: string;
  x: number;
  y: number;
}
```
`contextProps` - [Canvas context props](#Context-Props). *Default: `{}`*  
`drawMethod` - [Draw method](#drawMethods). *Default: `drawMethods.FILL`*  
`image` - [Image](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image) object  
`text` - text to be rendered  
`x` - position of the text in X axis. Text horizontal and vertical align can be adjusted by `contextProps`  
`y` - position of the text in Y axis Text horizontal and vertical align can be adjusted by `contextProps`  

### Transform
```ts
{
  type: objectTypes.TRANSFORM;
  contextProps?: Partial<CanvasRenderingContext2D>;
  children: Array<GraphicalObject>;
  dx?: number;
  dy?: number;
  scaleX?: number;
  scaleY?: number;
  skewX?: number;
  skewY?: number;
  rotation?: number;
}
```
`contextProps` - [Canvas context props](#Context-Props). *Default: `{}`*  
`children` - array of graphical objects  
`dx` - displacement of child objects in X axis. *Default: `0`*  
`dy` - displacement of child objects in Y axis. *Default: `0`*  
`scaleX` - scaling of child objects in X axis. *Default: `1`*  
`scaleY` - scaling of child objects in Y axis. *Default: `1`*  
`skewX` - skew transformation applied to child objects in X axis. *Default: `0`*  
`skewY` - skew transformation applied to child objects in Y axis. *Default: `0`*  
`rotation` - rotation in radians of child objects. *Default: `0`*  

## Context Props
For every graphical object you can specify `contextProps` property.
Before drawing graphical object, all values of `contextProps` object will be assigned
to [Canvas Rendering Context](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D).
Some example values that you can use: `fillStyle`, `strokeStyle`, `lineWidth`, `filter` and so on.
After drawing the graphical object, context properties will be restored back to their orginal values.

## Custom draw handlers
If you want to expand the capabilities of `declarative-canvas` to support more object types,
you can specify custom draw handlers which will be used to draw objects with specified object type.
Draw handler is a function with the following signature:
```ts
(context, options, drawObject) => void
```
To see examples of draw handlers, you can check out default draw handlers in [src/drawHandlerFunctions](./src/drawHandlerFunctions) directory.

Custom handlers can be passed as a `customDrawHandlers` argument to `createDrawFunction`.
`customDrawHandlers` should be an object, where keys represent object types and values represent custom handlers.

