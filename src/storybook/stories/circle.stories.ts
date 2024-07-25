import { createDrawFunction, objectTypes, drawMethods } from '../../index';
import createCanvasElement from '../utils/createCanvasElement';

const createDivWithContent = (content: string) => {
  const $div = document.createElement('div');
  $div.innerText = content;
  return $div;
};

export const circleBasic = {
  name: 'Circle',
  description: 'Drawing circles',
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
        type: objectTypes.CIRCLE,
        contextProps: { fillStyle: '#BEC6A0' },
        x: 150,
        y: 150,
        radius: 100,
        drawMethod: drawMethods.FILL,
      },
      {
        type: objectTypes.CIRCLE,
        contextProps: { strokeStyle: '#708871', lineWidth: 10 },
        x: 400,
        y: 150,
        radius: 100,
        drawMethod: drawMethods.STROKE,
      },
      {
        type: objectTypes.CIRCLE,
        contextProps: {
          fillStyle: '#BEC6A0',
          strokeStyle: '#708871',
          lineWidth: 10,
        },
        x: 275,
        y: 400,
        radius: 100,
        drawMethod: drawMethods.FILL_AND_STROKE,
      },
    ];

    draw({ context, objects });

    return {
      element: $canvas,
    };
  },
};
