import { createDrawFunction, objectTypes } from '../../index';
import createCanvasElement from '../utils/createCanvasElement';

const createDivWithContent = (content: string) => {
  const $div = document.createElement('div');
  $div.innerText = content;
  return $div;
};

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

const points = [
  { x: -200, y: -200, name: 'A' },
  { x: 200, y: -200, name: 'B' },
  { x: 200, y: 200, name: 'C' },
  { x: -200, y: 200, name: 'D' },
  { x: 0, y: 0, name: 'E' },
];

const objects = [
  ...getPointObjects(points[0]),
  ...getPointObjects(points[1]),
  ...getPointObjects(points[2]),
  ...getPointObjects(points[3]),
  ...getPointObjects(points[4]),
];

export const cameraTranslation = {
  name: 'Camera - Translation',
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

    const lastCursorPosition = { x: 0, y: 0 };
    const mouseMoveListener = (e: MouseEvent) => {
      lastCursorPosition.x = e.clientX;
      lastCursorPosition.y = e.clientY;
    };
    $canvas.addEventListener('mousemove', mouseMoveListener);

    const drawLoop = () => {
      const camera = {
        position: {
          x: lastCursorPosition.x * 0.3,
          y: lastCursorPosition.y * 0.3,
        },
        zoom: 0.6,
      };
      draw({ context, objects, camera });
      if (isRunning) {
        requestAnimationFrame(drawLoop);
      }
    };

    drawLoop();

    return {
      element: $canvas,
      cleanUp: () => {
        isRunning = false;
        $canvas.removeEventListener('mousemove', mouseMoveListener);
      },
    };
  },
};

export const cameraRotation = {
  name: 'Camera - Rotation',
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

    const objects = [
      ...getPointObjects({ x: -200, y: -200, name: 'A' }),
      ...getPointObjects({ x: 200, y: -200, name: 'B' }),
      ...getPointObjects({ x: 200, y: 200, name: 'C' }),
      ...getPointObjects({ x: -200, y: 200, name: 'D' }),
      ...getPointObjects({ x: 0, y: 0, name: 'E' }),
    ];

    const lastCursorPosition = { x: $canvas.width / 2, y: 0 };
    let focusedObjectIndex = 0;
    const mouseMoveListener = (e: MouseEvent) => {
      lastCursorPosition.x = e.clientX;
      lastCursorPosition.y = e.clientY;
    };
    const clickListener = () => {
      focusedObjectIndex = (focusedObjectIndex + 1) % points.length;
    };
    $canvas.addEventListener('mousemove', mouseMoveListener);
    $canvas.addEventListener('click', clickListener);

    const drawLoop = () => {
      const camera = {
        position: {
          x: points[focusedObjectIndex].x,
          y: points[focusedObjectIndex].y,
        },
        rotation:
          (lastCursorPosition.x - $canvas.width / 2) *
          ((2 * Math.PI) / $canvas.width),
        zoom: 0.6,
      };
      draw({ context, objects, camera });
      if (isRunning) {
        requestAnimationFrame(drawLoop);
      }
    };

    drawLoop();

    return {
      element: $canvas,
      cleanUp: () => {
        isRunning = false;
        $canvas.removeEventListener('mousemove', mouseMoveListener);
        $canvas.removeEventListener('click', clickListener);
      },
    };
  },
};
