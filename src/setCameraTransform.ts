import { Camera } from './types';

const setCameraTransform = ({
  context,
  canvasWidth,
  canvasHeight,
  camera,
}: {
  context: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;
  camera: Camera;
}): void => {
  context.setTransform(
    camera.zoom,
    0,
    0,
    camera.zoom,
    -camera.position.x * camera.zoom + canvasWidth / 2,
    -camera.position.y * camera.zoom + canvasHeight / 2
  );
};

export default setCameraTransform;
