import { setContextProps } from './canvasContextUtils';
import drawCircle from './drawCircle';
import drawPath from './drawPath';
import drawImage from './drawImage';
import drawText from './drawText';
import drawRect from './drawRect';

export const objectTypes = {
  CIRCLE: 'CIRCLE',
  PATH: 'PATH',
  IMAGE: 'IMAGE',
  TEXT: 'TEXT',
  RECT: 'RECT',
};

const defaultHandlers = {
  [objectTypes.CIRCLE]: drawCircle,
  [objectTypes.PATH]: drawPath,
  [objectTypes.IMAGE]: drawImage,
  [objectTypes.TEXT]: drawText,
  [objectTypes.RECT]: drawRect,
};

const unknownTypeHandler = () => {
  throw new Error('Unknown object type');
};

export const createDrawFunction = ({ customDrawHandlers = {} } = {}) => ({
  context,
  canvasWidth,
  canvasHeight,
  objects,
  camera = { position: { x: canvasWidth / 2, y: canvasHeight / 2 }, zoom: 1 },
}) => {
  const drawHandlers = { ...defaultHandlers, ...customDrawHandlers };

  context.clearRect(0, 0, canvasWidth, canvasHeight);
  context.save();
  context.setTransform(
    camera.zoom,
    0,
    0,
    camera.zoom,
    -camera.position.x * camera.zoom + canvasWidth / 2,
    -camera.position.y * camera.zoom + canvasHeight / 2
  );
  objects.forEach(({ type, contextProps = {}, ...options }) => {
    context.save();
    const drawObject = drawHandlers[type] || unknownTypeHandler;
    setContextProps(context, contextProps);
    drawObject(context, options);
    context.restore();
  });
  context.restore();
};
