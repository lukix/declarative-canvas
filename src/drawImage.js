const drawImage = (
  context,
  { image, x, y, width = image.width, height = image.height, rotation = 0 }
) => {
  context.translate(x, y);
  context.rotate(rotation);
  const relativeX = -width / 2;
  const relativeY = -height / 2;
  context.drawImage(image, relativeX, relativeY, width, height);
};

export default drawImage;
