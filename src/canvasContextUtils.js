import drawMethods from './drawMethods';

export const setContextProps = (context, contextProps) => {
  Object.assign(context, contextProps);
};

export const fillAndStroke = (context, drawMethod) => {
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
