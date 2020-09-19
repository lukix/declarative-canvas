import { createDrawFunction, objectTypes } from '../index';
import createCanvasElement from './utils/createCanvasElement';

export default { title: 'Custom Draw Handlers' };

export const customHandlers = () => {
  const { $canvas, context } = createCanvasElement();

  if (!context) {
    return 'Context identifier is not supported';
  }

  enum CustomTypes {
    CUSTOM_POINT = 'CUSTOM_POINT',
  }

  const customDrawHandlers = {
    [CustomTypes.CUSTOM_POINT]: (
      context: CanvasRenderingContext2D,
      { x, y }: { x: number; y: number }
    ) => {
      context.beginPath();
      const rotation = 0;
      const startAngle = 0;
      const endAngle = Math.PI * 2;
      const radius = 5;
      context.ellipse(x, y, radius, radius, rotation, startAngle, endAngle);
      context.fill();
    },
  };
  const draw = createDrawFunction(customDrawHandlers);

  const objects = [
    { type: CustomTypes.CUSTOM_POINT, x: 50, y: 50 },
    { type: CustomTypes.CUSTOM_POINT, x: 90, y: 90 },
    { type: CustomTypes.CUSTOM_POINT, x: 40, y: 120 },
  ];

  draw({ context, objects });

  return $canvas;
};
