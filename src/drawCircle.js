import { fillAndStroke } from './canvasContextUtils';

const drawCircle = (context, { x, y, radius, fill = true, stroke = true }) => {
  context.beginPath();
  const rotation = 0;
  const startAngle = 0;
  const endAngle = Math.PI * 2;
  context.ellipse(x, y, radius, radius, rotation, startAngle, endAngle);
  context.closePath();
  fillAndStroke(context, fill, stroke);
};

export default drawCircle;
