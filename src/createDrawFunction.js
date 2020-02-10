import { setContextProps } from './canvasContextUtils';
import setCameraTransform from './setCameraTransform';
import {
  drawCircle,
  drawImage,
  drawPath,
  drawRect,
  drawText,
  drawTransform,
} from './drawHandlerFunctions';
import objectTypes from './objectTypes';

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

const drawObjectFactory = context => {
  const drawObject = ({ type, contextProps = {}, ...options }) => {
    context.save();
    const drawHandler = drawHandlers[type] || unknownTypeHandler;
    setContextProps(context, contextProps);
    drawHandler(context, options, drawObject);
    context.restore();
  };

  return drawObject;
};

const createDrawFunction = () => ({
  context,
  canvasWidth,
  canvasHeight,
  objects,
  camera = { position: { x: canvasWidth / 2, y: canvasHeight / 2 }, zoom: 1 },
}) => {
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  context.save();
  setCameraTransform({ context, canvasWidth, canvasHeight, camera });
  const drawObject = drawObjectFactory(context);
  objects.forEach(objectToRender => {
    drawObject(objectToRender);
  });
  context.restore();
};

export default createDrawFunction;
