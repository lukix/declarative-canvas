const drawRect = (
  context,
  { x, y, width, height, fill = true, stroke = true }
) => {
  if (fill) {
    context.fillRect(x, y, width, height);
  }
  if (stroke) {
    context.strokeRect(x, y, width, height);
  }
};

export default drawRect;
