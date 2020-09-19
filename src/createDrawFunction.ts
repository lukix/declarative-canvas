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

const defaultDrawHandlers = {
  [objectTypes.CIRCLE]: drawCircle,
  [objectTypes.PATH]: drawPath,
  [objectTypes.IMAGE]: drawImage,
  [objectTypes.TEXT]: drawText,
  [objectTypes.RECT]: drawRect,
  [objectTypes.TRANSFORM]: drawTransform,
};

const unknownTypeHandler = () => {
  throw new Error('Unknown object type passed to declarative-canvas');
};

type DrawHandlersDictionary = { [key: string]: DrawHandler };

function drawObjectFactory(
  context: CanvasRenderingContext2D,
  drawHandlers: DrawHandlersDictionary
) {
  function drawObject({
    type,
    contextProps = {},
    ...options
  }: DrawingObject): void {
    context.save();
    const drawHandler = drawHandlers[type] || unknownTypeHandler;
    setContextProps(context, contextProps);
    drawHandler(context, options, drawObject);
    context.restore();
  }

  return drawObject;
}

type DrawFunctionProps = {
  context: CanvasRenderingContext2D;
  objects: Array<{
    type: string;
    contextProps?: Partial<CanvasRenderingContext2D>;
  }>;
  canvasWidth?: number;
  canvasHeight?: number;
  camera?: Camera;
};

type DrawFunction = (props: DrawFunctionProps) => void;
type CreateDrawFunction = (
  customDrawHandlers?: DrawHandlersDictionary
) => DrawFunction;

const createDrawFunction: CreateDrawFunction = (customDrawHandlers = {}) => {
  const drawHandlers = { ...defaultDrawHandlers, ...customDrawHandlers };
  function drawFunction({
    context,
    objects,
    canvasWidth = context.canvas?.width,
    canvasHeight = context.canvas?.height,
    camera = { position: { x: canvasWidth / 2, y: canvasHeight / 2 }, zoom: 1 },
  }: DrawFunctionProps): void {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.save();
    setCameraTransform({ context, canvasWidth, canvasHeight, camera });
    const drawObject = drawObjectFactory(context, drawHandlers);
    objects.forEach(objectToRender => {
      drawObject(objectToRender);
    });
    context.restore();
  }
  return drawFunction;
};

export default createDrawFunction;
