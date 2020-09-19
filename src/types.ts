export type Camera = { zoom: number; position: { x: number; y: number } };
export type DrawingObject<T> = {
  type: T;
  contextProps?: Partial<CanvasRenderingContext2D>;
};
export type DrawHandler<T> = (
  context: CanvasRenderingContext2D,
  options: any,
  drawObject: (props: DrawingObject<T>) => void
) => void;
