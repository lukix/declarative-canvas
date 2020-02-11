import { createDrawFunction, objectTypes } from '../index';
import createCanvasElement from './utils/createCanvasElement';

const draw = createDrawFunction();

export default { title: 'Camera' };

const getPointObjects = ({ x, y, name }) => [
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

  const objects = [
    ...getPointObjects({ x: -200, y: -200, name: 'A' }),
    ...getPointObjects({ x: 200, y: -200, name: 'B' }),
    ...getPointObjects({ x: 200, y: 200, name: 'C' }),
    ...getPointObjects({ x: -200, y: 200, name: 'D' }),
    ...getPointObjects({ x: 0, y: 0, name: 'E' }),
  ];

  const camera = { position: { x: 0, y: 0 }, zoom: 0.6 };

  draw({ context, objects, camera });

  return $canvas;
};
