import drawMethods from './drawMethods';

export const setContextProps = (
  context: CanvasRenderingContext2D,
  contextProps: Partial<CanvasRenderingContext2D>
) => {
  Object.assign(context, contextProps);
};

export const fillAndStroke = (
  context: CanvasRenderingContext2D,
  drawMethod: drawMethods
) => {
  if (
    drawMethod === drawMethods.FILL ||
    drawMethod === drawMethods.FILL_AND_STROKE
  ) {
    context.fill();
  }
  if (
    drawMethod === drawMethods.STROKE ||
    drawMethod === drawMethods.FILL_AND_STROKE
  ) {
    context.stroke();
  }
};
