import { fillAndStroke } from '../canvasContextUtils';
import drawMethods from '../drawMethods';

const drawPath = (
  context: CanvasRenderingContext2D,
  {
    points: [startPoint, ...restPoints],
    closePath = false,
    drawMethod = drawMethods.STROKE,
  }: {
    points: Array<{ x: number; y: number }>;
    closePath?: boolean;
    drawMethod?: string;
  }
): void => {
  context.beginPath();
  context.moveTo(startPoint.x, startPoint.y);
  restPoints.forEach(({ x, y }) => context.lineTo(x, y));
  if (closePath) {
    context.closePath();
  }
  fillAndStroke(context, drawMethod);
};

export default drawPath;
