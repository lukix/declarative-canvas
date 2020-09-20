import { createDrawFunction, objectTypes, drawMethods } from '../index';
import createCanvasElement from './utils/createCanvasElement';

const draw = createDrawFunction();

export default { title: 'Rect' };

export const basic = () => {
  const { $canvas, context } = createCanvasElement();

  if (!context) {
    return 'Context identifier is not supported';
  }

  const objects = [
    {
      type: objectTypes.RECT,
      contextProps: { fillStyle: 'indianred' },
      x: 150,
      y: 200,
      width: 200,
      height: 200,
    },
  ];

  draw({ context, objects });

  return $canvas;
};

export const fillAndStroke = () => {
  const { $canvas, context } = createCanvasElement();

  if (!context) {
    return 'Context identifier is not supported';
  }

  const objects = [
    {
      type: objectTypes.RECT,
      contextProps: { fillStyle: 'lightsalmon' },
      x: 150,
      y: 150,
      width: 200,
      height: 200,
      drawMethod: drawMethods.FILL,
    },
    {
      type: objectTypes.RECT,
      contextProps: { strokeStyle: 'indianred', lineWidth: 10 },
      x: 400,
      y: 150,
      width: 200,
      height: 200,
      drawMethod: drawMethods.STROKE,
    },
    {
      type: objectTypes.RECT,
      contextProps: {
        fillStyle: 'lightsalmon',
        strokeStyle: 'indianred',
        lineWidth: 10,
      },
      x: 275,
      y: 400,
      width: 200,
      height: 200,
      drawMethod: drawMethods.FILL_AND_STROKE,
    },
  ];

  draw({ context, objects });

  return $canvas;
};

export const rotated = () => {
  const { $canvas, context } = createCanvasElement();

  if (!context) {
    return 'Context identifier is not supported';
  }

  const objects = [
    {
      type: objectTypes.RECT,
      contextProps: { fillStyle: 'lightsalmon' },
      x: 300,
      y: 300,
      width: 200,
      height: 200,
      rotation: Math.PI / 6,
    },
  ];

  draw({ context, objects });

  return $canvas;
};
