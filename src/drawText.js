const drawText = (context, { text, x, y, fill = true, stroke = false }) => {
  if (fill) {
    context.fillText(text, x, y);
  }
  if (stroke) {
    context.strokeText(text, x, y);
  }
};

export default drawText;
