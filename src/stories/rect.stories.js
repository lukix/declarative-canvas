import { createDrawFunction, objectTypes } from '../index';
import createCanvasElement from './utils/createCanvasElement';

const draw = createDrawFunction();

export default { title: 'Rect' };

export const basic = () => {
  const { $canvas, context, canvasWidth, canvasHeight } = createCanvasElement();

  const objects = [
    {
      type: objectTypes.RECT,
      contextProps: { fillStyle: 'red' },
      x: 150,
      y: 200,
      width: 200,
      height: 200,
    },
  ];

  draw({ context, canvasWidth, canvasHeight, objects });

  return $canvas;
};

export const multiple = () => {
  const { $canvas, context, canvasWidth, canvasHeight } = createCanvasElement();

  const objects = [
    {
      type: objectTypes.RECT,
      contextProps: { fillStyle: 'red' },
      x: 150,
      y: 200,
      width: 200,
      height: 200,
    },
    {
      type: objectTypes.RECT,
      contextProps: { fillStyle: 'green' },
      x: 225,
      y: 275,
      width: 150,
      height: 150,
    },
    {
      type: objectTypes.RECT,
      contextProps: { fillStyle: 'blue' },
      x: 225,
      y: 275,
      width: 50,
      height: 50,
    },
  ];

  draw({ context, canvasWidth, canvasHeight, objects });

  return $canvas;
};

export const rotated = () => {
  const { $canvas, context, canvasWidth, canvasHeight } = createCanvasElement();

  const objects = [
    {
      type: objectTypes.RECT,
      contextProps: { fillStyle: 'green' },
      x: 150,
      y: 200,
      width: 200,
      height: 200,
      rotation: Math.PI / 6,
    },
  ];

  draw({ context, canvasWidth, canvasHeight, objects });

  return $canvas;
};
