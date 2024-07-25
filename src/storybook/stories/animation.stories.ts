import { createDrawFunction, objectTypes, drawMethods } from '../../index';
import createCanvasElement from '../utils/createCanvasElement';

const createDivWithContent = (content: string) => {
  const $div = document.createElement('div');
  $div.innerText = content;
  return $div;
};

export const animation = {
  name: 'Animation',
  description: 'Lorem ipsum',
  create: () => {
    let isRunning = true;
    const { $canvas, context } = createCanvasElement();

    if (!context) {
      return {
        element: createDivWithContent('Context identifier is not supported'),
      };
    }

    const draw = createDrawFunction();

    let timeElapsed = 0;

    const renderFrame = () => {
      timeElapsed = timeElapsed + 1;
      const rotation = timeElapsed * 0.005;
      const lineWidth = 5 + Math.sin(timeElapsed * 0.07) * 5;

      const objects = [
        {
          type: objectTypes.RECT,
          contextProps: {
            fillStyle: '#BEC6A0',
            strokeStyle: '#708871',
            lineWidth,
          },
          x: 300,
          y: 300,
          width: 200,
          height: 200,
          rotation,
          drawMethod: drawMethods.FILL_AND_STROKE,
        },
      ];

      draw({ context, objects });

      if (isRunning) {
        requestAnimationFrame(renderFrame);
      }
    };

    renderFrame();

    return {
      element: $canvas,
      cleanUp: () => {
        isRunning = false;
      },
    };
  },
};
