import { createDrawFunction, objectTypes, drawMethods } from '../index';
import createCanvasElement from './utils/createCanvasElement';

const draw = createDrawFunction();

export default { title: 'Text' };

export const text = () => {
  const { $canvas, context } = createCanvasElement();

  if (!context) {
    return 'Context identifier is not supported';
  }

  const objects = [
    {
      type: objectTypes.TEXT,
      contextProps: { fillStyle: 'indianred', font: '45px Times New Roman' },
      x: 50,
      y: 150,
      text: 'data-renderer',
    },
    {
      type: objectTypes.TEXT,
      contextProps: { fillStyle: 'indianred', font: '45px Courier' },
      x: 50,
      y: 250,
      text: 'data-renderer',
    },
    {
      type: objectTypes.TEXT,
      contextProps: { strokeStyle: 'indianred', font: '60px Courier' },
      x: 50,
      y: 350,
      text: 'data-renderer',
      drawMethod: drawMethods.STROKE,
    },
  ];

  draw({ context, objects });

  return $canvas;
};
