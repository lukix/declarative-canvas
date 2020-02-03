import { createDrawFunction, objectTypes } from '../index';
import createCanvasElement from './utils/createCanvasElement';

const draw = createDrawFunction();

export default { title: 'Transform' };

export const transform = () => {
  const { $canvas, context, canvasWidth, canvasHeight } = createCanvasElement();

  const objects = [
    {
      type: objectTypes.TRANSFORM,
      contextProps: { fillStyle: 'red' },
      dx: 50,
      dy: 50,
      rotation: Math.PI / 4,
      children: [
        {
          type: objectTypes.RECT,
          contextProps: { fillStyle: 'red' },
          x: 200,
          y: 0,
          width: 50,
          height: 50,
        },
        {
          type: objectTypes.PATH,
          points: [
            { x: 0, y: 0 },
            { x: 200, y: 0 },
          ],
        },
        {
          type: objectTypes.TEXT,
          contextProps: {
            fillStyle: 'black',
            textAlign: 'center',
            font: '18px Times New Roman',
          },
          text: 'Text',
          x: 200,
          y: -30,
        },
      ],
    },
  ];

  draw({ context, canvasWidth, canvasHeight, objects });

  return $canvas;
};
