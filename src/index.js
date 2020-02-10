import { setContextProps } from './canvasContextUtils';
import {
  drawCircle,
  drawImage,
  drawPath,
  drawRect,
  drawText,
  drawTransform,
} from './drawHandlerFunctions';

export { default as drawMethods } from './drawMethods';

export const objectTypes = {
  CIRCLE: 'CIRCLE',
  PATH: 'PATH',
  IMAGE: 'IMAGE',
  TEXT: 'TEXT',
  RECT: 'RECT',
  TRANSFORM: 'TRANSFORM',
};

const drawHandlers = {
  [objectTypes.CIRCLE]: drawCircle,
  [objectTypes.PATH]: drawPath,
  [objectTypes.IMAGE]: drawImage,
  [objectTypes.TEXT]: drawText,
  [objectTypes.RECT]: drawRect,
  [objectTypes.TRANSFORM]: drawTransform,
};

const unknownTypeHandler = () => {
  throw new Error('Unknown object type');
};

const setCameraTransform = ({ context, canvasWidth, canvasHeight, camera }) => {
  context.setTransform(
    camera.zoom,
    0,
    0,
    camera.zoom,
    -camera.position.x * camera.zoom + canvasWidth / 2,
    -camera.position.y * camera.zoom + canvasHeight / 2
  );
};

export const createDrawFunction = () => ({
  context,
  canvasWidth,
  canvasHeight,
  objects,
  camera = { position: { x: canvasWidth / 2, y: canvasHeight / 2 }, zoom: 1 },
}) => {
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  context.save();
  setCameraTransform({ context, canvasWidth, canvasHeight, camera });

  const drawObject = ({ type, contextProps = {}, ...options }) => {
    context.save();
    const drawHandler = drawHandlers[type] || unknownTypeHandler;
    setContextProps(context, contextProps);
    drawHandler(context, options, drawObject);
    context.restore();
  };

  objects.forEach(objectToRender => {
    drawObject(objectToRender);
  });
  context.restore();
};
