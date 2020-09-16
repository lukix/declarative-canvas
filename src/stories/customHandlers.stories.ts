import { createDrawFunction } from '../index';
import createCanvasElement from './utils/createCanvasElement';

export default { title: 'Custom Draw Handlers' };

export const customHandlers = () => {
  const { $canvas, context } = createCanvasElement();

  if (!context) {
    return 'Context identifier is not supported';
  }

  const customDrawHandlers = {
    CUSTOM_POINT: (
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
    { type: 'CUSTOM_POINT', x: 50, y: 50 },
    { type: 'CUSTOM_POINT', x: 90, y: 90 },
    { type: 'CUSTOM_POINT', x: 40, y: 120 },
  ];

  draw({ context, objects });

  return $canvas;
};
