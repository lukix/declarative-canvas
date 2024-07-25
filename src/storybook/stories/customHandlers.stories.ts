import { createDrawFunction, objectTypes } from '../../index';
import createCanvasElement from '../utils/createCanvasElement';

const createDivWithContent = (content: string) => {
  const $div = document.createElement('div');
  $div.innerText = content;
  return $div;
};

export const customHandlersBasic = {
  name: 'Custom Draw Handlers',
  description:
    'These glowing stars are not included in declarative-canvas library. They are build using custom objects.',
  create: () => {
    const { $canvas, context } = createCanvasElement();

    if (!context) {
      return {
        element: createDivWithContent('Context identifier is not supported'),
      };
    }

    enum CustomTypes {
      CUSTOM_GLOWING_STAR = 'CUSTOM_GLOWING_STAR',
    }

    const customDrawHandlers = {
      [CustomTypes.CUSTOM_GLOWING_STAR]: (
        context: CanvasRenderingContext2D,
        { x, y }: { x: number; y: number }
      ) => {
        context.beginPath();
        const rotation = 0;
        const startAngle = 0;
        const endAngle = Math.PI * 2;
        const radius = 3;
        context.save();
        context.filter = 'blur(8px)';
        context.fillStyle = 'yellow';
        context.ellipse(
          x,
          y,
          radius,
          3 * radius,
          rotation,
          startAngle,
          endAngle
        );
        context.fill();
        context.restore();
        context.fillStyle = 'yellow';
        context.ellipse(
          x,
          y,
          3 * radius,
          radius,
          rotation,
          startAngle,
          endAngle
        );
        context.fill();
      },
    };
    const draw = createDrawFunction(customDrawHandlers);

    const objects = [
      {
        type: objectTypes.RECT,
        x: 300,
        y: 300,
        width: 600,
        height: 600,
        contextProps: { fillStyle: 'black' },
      },
      { type: CustomTypes.CUSTOM_GLOWING_STAR, x: 280, y: 260 },
      { type: CustomTypes.CUSTOM_GLOWING_STAR, x: 320, y: 300 },
      { type: CustomTypes.CUSTOM_GLOWING_STAR, x: 270, y: 330 },
    ];

    draw({ context, objects });

    return {
      element: $canvas,
    };
  },
};
