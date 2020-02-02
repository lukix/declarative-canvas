import { fillAndStroke } from './canvasContextUtils';

const drawPath = (
  context,
  {
    points: [startPoint, ...restPoints],
    closePath = false,
    fill = true,
    stroke = true,
  }
) => {
  context.beginPath();
  context.moveTo(startPoint.x, startPoint.y);
  restPoints.forEach(({ x, y }) => context.lineTo(x, y));
  if (closePath) {
    context.closePath();
  }
  fillAndStroke(context, fill, stroke);
};

export default drawPath;
