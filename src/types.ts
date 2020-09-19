type Camera = { zoom: number; position: { x: number; y: number } };
type DrawingObject = {
  type: string;
  contextProps?: Partial<CanvasRenderingContext2D>;
};
type DrawHandler = (
  context: CanvasRenderingContext2D,
  options: any,
  drawObject: (props: DrawingObject) => void
) => void;
