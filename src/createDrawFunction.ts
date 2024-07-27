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
import { Camera, GraphicalObject, DrawHandler } from './types';

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

type DrawHandlersDictionary<T extends string | number | symbol> = Record<
  T,
  DrawHandler<T>
>;

function drawObjectFactory<
  Handlers extends DrawHandlersDictionary<keyof Handlers>,
>(context: CanvasRenderingContext2D, drawHandlers: Handlers) {
  function drawObject({
    type,
    contextProps = {},
    ...options
  }: GraphicalObject<keyof Handlers>): void {
    context.save();
    const drawHandler = drawHandlers[type] || unknownTypeHandler;
    setContextProps(context, contextProps);
    drawHandler(context, options, drawObject);
    context.restore();
  }

  return drawObject;
}

type GObject<
  Handlers extends DrawHandlersDictionary<T>,
  T extends keyof Handlers,
> = {
  type: T;
  contextProps?: Partial<CanvasRenderingContext2D>;
} & Parameters<Handlers[T]>[1];

type DrawFunctionProps<
  Handlers extends DrawHandlersDictionary<keyof Handlers>,
> = {
  context: CanvasRenderingContext2D;
  objects: Array<GObject<Handlers, keyof Handlers>>;
  canvasWidth?: number;
  canvasHeight?: number;
  camera?: Camera;
  clearCanvas?: boolean;
};

function createDrawFunction<CH extends DrawHandlersDictionary<keyof CH>>(
  customDrawHandlers: CH = {} as CH
) {
  const drawHandlers = { ...defaultDrawHandlers, ...customDrawHandlers };
  function drawFunction({
    context,
    objects,
    canvasWidth = context.canvas?.width,
    canvasHeight = context.canvas?.height,
    camera = {
      position: { x: canvasWidth / 2, y: canvasHeight / 2 },
      zoom: 1,
      rotation: 0,
    },
    clearCanvas = true,
  }: DrawFunctionProps<typeof defaultDrawHandlers & CH>): void {
    if (clearCanvas) {
      context.clearRect(0, 0, canvasWidth, canvasHeight);
    }
    context.save();
    setCameraTransform({ context, canvasWidth, canvasHeight, camera });
    const drawObject = drawObjectFactory(context, drawHandlers);
    objects.forEach((objectToRender) => {
      drawObject(objectToRender);
    });
    context.restore();
  }
  return drawFunction;
}

export default createDrawFunction;
