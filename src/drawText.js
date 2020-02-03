import drawMethods from './drawMethods';

const drawText = (context, { text, x, y, drawMethod = drawMethods.FILL }) => {
  if (
    drawMethod === drawMethods.FILL ||
    drawMethod === drawMethods.FILL_AND_STROKE
  ) {
    context.fillText(text, x, y);
  }
  if (
    drawMethod === drawMethods.STROKE ||
    drawMethod === drawMethods.FILL_AND_STROKE
  ) {
    context.strokeText(text, x, y);
  }
};

export default drawText;
