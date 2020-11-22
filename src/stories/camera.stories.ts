import { createDrawFunction, objectTypes } from '../index';
import createCanvasElement from './utils/createCanvasElement';
import createCanvasDescriptionWrapper from './utils/createCanvasDescriptionWrapper';

const draw = createDrawFunction();

export default { title: 'Camera' };

const getPointObjects = ({
  x,
  y,
  name,
}: {
  x: number;
  y: number;
  name: string;
}) => [
  {
    type: objectTypes.CIRCLE,
    contextProps: { fillStyle: 'black' },
    x,
    y,
    radius: 5,
  },
  {
    type: objectTypes.TEXT,
    contextProps: { fillStyle: 'black', font: '35px Times New Roman' },
    x: x + 10,
    y: y - 10,
    text: `${name} = (${x}, ${y})`,
  },
];

export const camera = () => {
  const { $canvas, context } = createCanvasElement();

  if (!context) {
    return 'Context identifier is not supported';
  }

  const objects = [
    ...getPointObjects({ x: -200, y: -200, name: 'A' }),
    ...getPointObjects({ x: 200, y: -200, name: 'B' }),
    ...getPointObjects({ x: 200, y: 200, name: 'C' }),
    ...getPointObjects({ x: -200, y: 200, name: 'D' }),
    ...getPointObjects({ x: 0, y: 0, name: 'E' }),
  ];

  const lastCursorPosition = { x: 0, y: 0 };
  $canvas.addEventListener('mousemove', (event) => {
    lastCursorPosition.x = event.clientX;
    lastCursorPosition.y = event.clientY;
  });

  const drawLoop = () => {
    const camera = {
      position: { x: lastCursorPosition.x * 0.3, y: lastCursorPosition.y * 0.3 },
      zoom: 0.6
    };
    draw({ context, objects, camera });
    requestAnimationFrame(drawLoop);
  }
  
  drawLoop();

  return createCanvasDescriptionWrapper(
    'Move cursor over the canvas to influence camera\'s position',
    $canvas
  );
};
