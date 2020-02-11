const drawTransform = (
  context,
  {
    dx = 0,
    dy = 0,
    scaleX = 1,
    scaleY = 1,
    skewX = 0,
    skewY = 0,
    rotation = 0,
    children,
  },
  drawObject
) => {
  context.setTransform(scaleX, skewY, skewX, scaleY, dx, dy);
  context.rotate(rotation);
  children.forEach(childObject => {
    drawObject(childObject);
  });
};

export default drawTransform;
