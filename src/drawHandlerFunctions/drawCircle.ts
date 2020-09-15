import { fillAndStroke } from '../canvasContextUtils';
import drawMethods from '../drawMethods';

const drawCircle = (
  context: CanvasRenderingContext2D,
  {
    x,
    y,
    radius,
    drawMethod = drawMethods.FILL,
  }: {
    x: number;
    y: number;
    radius: number;
    drawMethod?: string;
  }
): void => {
  context.beginPath();
  const rotation = 0;
  const startAngle = 0;
  const endAngle = Math.PI * 2;
  context.ellipse(x, y, radius, radius, rotation, startAngle, endAngle);
  fillAndStroke(context, drawMethod);
};

export default drawCircle;
