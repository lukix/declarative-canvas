import { fillAndStroke } from './canvasContextUtils';
import drawMethods from './drawMethods';

const drawCircle = (
  context,
  { x, y, radius, drawMethod = drawMethods.FILL }
) => {
  context.beginPath();
  const rotation = 0;
  const startAngle = 0;
  const endAngle = Math.PI * 2;
  context.ellipse(x, y, radius, radius, rotation, startAngle, endAngle);
  fillAndStroke(context, drawMethod);
};

export default drawCircle;
