import { GraphicalObject } from '../types';

const drawTransform = <T>(
  context: CanvasRenderingContext2D,
  {
    dx = 0,
    dy = 0,
    scaleX = 1,
    scaleY = 1,
    skewX = 0,
    skewY = 0,
    rotation = 0,
    children,
  }: {
    dx?: number;
    dy?: number;
    scaleX?: number;
    scaleY?: number;
    skewX?: number;
    skewY?: number;
    rotation?: number;
    children: Array<GraphicalObject<T>>;
  },
  drawObject: (props: GraphicalObject<T>) => void
): void => {
  context.transform(scaleX, skewY, skewX, scaleY, dx, dy);
  context.rotate(rotation);
  children.forEach((childObject) => {
    drawObject(childObject);
  });
};

export default drawTransform;
