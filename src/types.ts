type Camera = { zoom: number; position: { x: number; y: number } };
type DrawObjectType = (props: { type: string; contextProps: any }) => void;
type DrawHandlerType = (
  context: CanvasRenderingContext2D,
  options: any,
  drawObject: DrawObjectType
) => void;
