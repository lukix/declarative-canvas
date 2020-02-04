import { createDrawFunction, objectTypes, drawMethods } from '../index';
import createCanvasElement from './utils/createCanvasElement';

const draw = createDrawFunction();

export default { title: 'Animations' };

export const Animation = () => {
  const { $canvas, context, canvasWidth, canvasHeight } = createCanvasElement();

  let timeElapsed = 0;

  const renderFrame = () => {
    timeElapsed = timeElapsed + 1;
    const rotation = timeElapsed * 0.005;
    const lineWidth = 5 + Math.sin(timeElapsed * 0.07) * 5;

    const objects = [
      {
        type: objectTypes.RECT,
        contextProps: {
          fillStyle: 'lightsalmon',
          strokeStyle: 'indianred',
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

    draw({ context, canvasWidth, canvasHeight, objects });

    requestAnimationFrame(renderFrame);
  };

  renderFrame();

  return $canvas;
};
