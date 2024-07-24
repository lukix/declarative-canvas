import { Camera } from './types';
import { getTransformMatrix } from './getTransformMatrix';

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
  const transformMatrix = getTransformMatrix({
    canvasWidth,
    canvasHeight,
    camera,
  });
  context.setTransform(
    transformMatrix[0][0],
    transformMatrix[1][0],
    transformMatrix[0][1],
    transformMatrix[1][1],
    transformMatrix[0][2],
    transformMatrix[1][2]
  );
};

export default setCameraTransform;
