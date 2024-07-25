import { createDrawFunction, objectTypes, drawMethods } from '../../index';
import createCanvasElement from '../utils/createCanvasElement';

const createDivWithContent = (content: string) => {
  const $div = document.createElement('div');
  $div.innerText = content;
  return $div;
};

export const pathBasic = {
  name: 'Path',
  description: 'Drawing paths',
  create: () => {
    const { $canvas, context } = createCanvasElement();

    if (!context) {
      return {
        element: createDivWithContent('Context identifier is not supported'),
      };
    }

    const draw = createDrawFunction();

    const objects = [
      {
        type: objectTypes.PATH,
        contextProps: {
          fillStyle: '#BEC6A0',
          strokeStyle: '#708871',
          lineWidth: 5,
        },
        points: [
          { x: 70, y: 50 },
          { x: 120, y: 75 },
          { x: 140, y: 150 },
          { x: 40, y: 110 },
        ],
        drawMethod: drawMethods.STROKE,
      },
      {
        type: objectTypes.PATH,
        contextProps: {
          fillStyle: '#BEC6A0',
          strokeStyle: '#708871',
          lineWidth: 5,
        },
        points: [
          { x: 200 + 70, y: 50 },
          { x: 200 + 120, y: 75 },
          { x: 200 + 140, y: 150 },
          { x: 200 + 40, y: 110 },
        ],
        drawMethod: drawMethods.STROKE,
        closePath: true,
      },
      {
        type: objectTypes.PATH,
        contextProps: {
          fillStyle: '#BEC6A0',
          strokeStyle: '#708871',
          lineWidth: 5,
        },
        points: [
          { x: 400 + 70, y: 50 },
          { x: 400 + 120, y: 75 },
          { x: 400 + 140, y: 150 },
          { x: 400 + 40, y: 110 },
        ],
        drawMethod: drawMethods.FILL,
      },
    ];

    draw({ context, objects });

    return {
      element: $canvas,
    };
  },
};
