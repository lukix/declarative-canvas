import { createDrawFunction, objectTypes, drawMethods } from '../../index';
import createCanvasElement from '../utils/createCanvasElement';

const createDivWithContent = (content: string) => {
  const $div = document.createElement('div');
  $div.innerText = content;
  return $div;
};

export const rectBasic = {
  name: 'Rect - Basic',
  description: 'Drawing a rectangle',
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
        type: objectTypes.RECT,
        contextProps: { fillStyle: '#708871' },
        x: 150,
        y: 200,
        width: 200,
        height: 200,
      },
    ];

    draw({ context, objects });

    return {
      element: $canvas,
    };
  },
};

export const rectFillAndStroke = {
  name: 'Rect - Fill and Stroke',
  description: 'Drawing a rectangle',
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
        type: objectTypes.RECT,
        contextProps: { fillStyle: '#BEC6A0' },
        x: 150,
        y: 150,
        width: 200,
        height: 200,
        drawMethod: drawMethods.FILL,
      },
      {
        type: objectTypes.RECT,
        contextProps: { strokeStyle: '#708871', lineWidth: 10 },
        x: 400,
        y: 150,
        width: 200,
        height: 200,
        drawMethod: drawMethods.STROKE,
      },
      {
        type: objectTypes.RECT,
        contextProps: {
          fillStyle: '#BEC6A0',
          strokeStyle: '#708871',
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

    return {
      element: $canvas,
    };
  },
};

export const rectRotated = {
  name: 'Rect - Rotated',
  description: 'Drawing a rectangle',
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
        type: objectTypes.RECT,
        contextProps: { fillStyle: '#BEC6A0' },
        x: 300,
        y: 300,
        width: 200,
        height: 200,
        rotation: Math.PI / 6,
      },
    ];

    draw({ context, objects });

    return {
      element: $canvas,
    };
  },
};
