import { createDrawFunction, objectTypes, drawMethods } from '../index';
import createCanvasElement from './utils/createCanvasElement';

const draw = createDrawFunction();

export default { title: 'Circle' };

export const fillAndStroke = () => {
  const { $canvas, context } = createCanvasElement();

  if (!context) {
    return 'Context identifier is not supported';
  }

  const objects = [
    {
      type: objectTypes.CIRCLE,
      contextProps: { fillStyle: 'lightsalmon' },
      x: 150,
      y: 150,
      radius: 100,
      drawMethod: drawMethods.FILL,
    },
    {
      type: objectTypes.CIRCLE,
      contextProps: { strokeStyle: 'indianred', lineWidth: 10 },
      x: 400,
      y: 150,
      radius: 100,
      drawMethod: drawMethods.STROKE,
    },
    {
      type: objectTypes.CIRCLE,
      contextProps: {
        fillStyle: 'lightsalmon',
        strokeStyle: 'indianred',
        lineWidth: 10,
      },
      x: 275,
      y: 400,
      radius: 100,
      drawMethod: drawMethods.FILL_AND_STROKE,
    },
  ];

  draw({ context, objects });

  return $canvas;
};
