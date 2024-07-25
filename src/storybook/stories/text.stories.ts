import { createDrawFunction, objectTypes, drawMethods } from '../../index';
import createCanvasElement from '../utils/createCanvasElement';

const createDivWithContent = (content: string) => {
  const $div = document.createElement('div');
  $div.innerText = content;
  return $div;
};

export const textBasic = {
  name: 'Text',
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
        type: objectTypes.TEXT,
        contextProps: { fillStyle: '#708871', font: '45px Times New Roman' },
        x: 50,
        y: 150,
        text: 'data-renderer',
      },
      {
        type: objectTypes.TEXT,
        contextProps: { fillStyle: '#708871', font: '45px Courier' },
        x: 50,
        y: 250,
        text: 'data-renderer',
      },
      {
        type: objectTypes.TEXT,
        contextProps: { strokeStyle: '#708871', font: '60px Courier' },
        x: 50,
        y: 350,
        text: 'data-renderer',
        drawMethod: drawMethods.STROKE,
      },
    ];

    draw({ context, objects });

    return {
      element: $canvas,
    };
  },
};
