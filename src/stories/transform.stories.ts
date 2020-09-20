import { createDrawFunction, objectTypes } from '../index';
import createCanvasElement from './utils/createCanvasElement';

const draw = createDrawFunction();

export default { title: 'Transform' };

export const transform = () => {
  const { $canvas, context } = createCanvasElement();

  if (!context) {
    return 'Context identifier is not supported';
  }

  const objects = [
    {
      type: objectTypes.TRANSFORM,
      dx: 50,
      dy: 50,
      rotation: Math.PI / 4,
      children: [
        {
          type: objectTypes.RECT,
          contextProps: { fillStyle: 'lightsalmon' },
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
            textAlign: 'center' as CanvasTextAlign,
            font: '18px Times New Roman',
          },
          text: 'Text',
          x: 200,
          y: -30,
        },
      ],
    },
  ];

  draw({ context, objects });

  return $canvas;
};
