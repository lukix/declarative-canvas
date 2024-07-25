const drawImage = (
  context: CanvasRenderingContext2D,
  {
    image,
    x,
    y,
    width = Number(image.width),
    height = Number(image.height),
    rotation = 0,
  }: {
    image: HTMLImageElement;
    x: number;
    y: number;
    width?: number;
    height?: number;
    rotation?: number;
  }
): void => {
  context.translate(x, y);
  context.rotate(rotation);
  const relativeX = -width / 2;
  const relativeY = -height / 2;
  context.drawImage(image, relativeX, relativeY, width, height);
};

export default drawImage;
