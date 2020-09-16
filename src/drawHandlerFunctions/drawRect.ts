import drawMethods from '../drawMethods';

const drawRect: DrawHandlerType = (
  context: CanvasRenderingContext2D,
  {
    x,
    y,
    width,
    height,
    drawMethod = drawMethods.FILL,
    rotation = 0,
  }: {
    x: number;
    y: number;
    width: number;
    height: number;
    drawMethod: drawMethods;
    rotation?: number;
  }
): void => {
  context.translate(x, y);
  context.rotate(rotation);
  const relativeX = -width / 2;
  const relativeY = -height / 2;
  if (
    drawMethod === drawMethods.FILL ||
    drawMethod === drawMethods.FILL_AND_STROKE
  ) {
    context.fillRect(relativeX, relativeY, width, height);
  }
  if (
    drawMethod === drawMethods.STROKE ||
    drawMethod === drawMethods.FILL_AND_STROKE
  ) {
    context.strokeRect(relativeX, relativeY, width, height);
  }
};

export default drawRect;
