type Camera = { zoom: number; position: { x: number; y: number } };
type DrawingObjectType = {
  type: string;
  contextProps?: Partial<CanvasRenderingContext2D>;
};
type DrawObjectType = (props: DrawingObjectType) => void;
type DrawHandlerType = (
  context: CanvasRenderingContext2D,
  options: any,
  drawObject: DrawObjectType
) => void;
