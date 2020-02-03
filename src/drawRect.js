const drawRect = (
  context,
  { x, y, width, height, fill = true, stroke = true, rotation = 0 }
) => {
  context.translate(x, y);
  context.rotate(rotation);
  const relativeX = -width / 2;
  const relativeY = -height / 2;
  if (fill) {
    context.fillRect(relativeX, relativeY, width, height);
  }
  if (stroke) {
    context.strokeRect(relativeX, relativeY, width, height);
  }
};

export default drawRect;
