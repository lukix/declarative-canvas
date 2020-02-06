# declarative-canvas
JavaScript library which lets you draw on canvas in a declarative way.

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

draw({
  context,
  canvasWidth: canvas.width,
  canvasHeight: canvas.height,
  objects: objectsToRender,
});
```

## API Reference
`declarative-canvas` exports three objects/functions:
- `createDrawFunction` - draw function factory,
- `objectTypes` - dictionary object of available object types which can be drawn,
- `drawStyles` - dictionary object of available drawing styles.

### createDrawFunction
A factory function that takes no arguments and returns a function with the following signature:

```ts
({
  context: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  objects: Array<object>,
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

### drawStyles
```js
{
  FILL: 'FILL',
  STROKE: 'STROKE',
  FILL_AND_STROKE: 'FILL_AND_STROKE',
}
```

## Available object shapes

### Rectangle
```ts
{
  type: string;
  contextProps?: object;
  drawMethod?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
}
```

### Circle
```ts
{
  type: string;
  contextProps?: object;
  drawMethod?: string;
  x: number;
  y: number;
  radius: number;
}
```

### Path
```ts
{
  type: string;
  contextProps?: object;
  drawMethod?: string;
  points: Array<{ x: number; y: number }>,
  closePath?: boolean,
}
```

### Image
```ts
{
  type: string;
  contextProps?: object;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
}
```

### Text
```ts
{
  type: string;
  contextProps?: object;
  drawMethod?: string;
  text: string;
  x: number;
  y: number;
}
```

### Transform
```ts
{
  type: string;
  contextProps?: object;
  dx?: number;
  dy?: number;
  scaleX?: number;
  scaleY?: number;
  skewX?: number;
  skewY?: number;
  rotation?: number;
  children: Array<object>;
}
```
