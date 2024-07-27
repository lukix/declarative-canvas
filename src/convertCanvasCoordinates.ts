import { Camera } from './types';
import { getInverseTransformMatrix } from './getTransformMatrix';
import multiplyMatrices from './multiplyMatrices';

const convertCanvasCoordinates = (
  x: number,
  y: number,
  canvasWidth: number,
  canvasHeight: number,
  camera: Camera
) => {
  const inverseTransformMatrix = getInverseTransformMatrix({
    canvasWidth,
    canvasHeight,
    camera,
  });

  const inputCoordinatesMatrix = [[x], [y], [1]];
  const outputCoordinatesMatrix = multiplyMatrices(
    inverseTransformMatrix,
    inputCoordinatesMatrix
  );

  return {
    x: outputCoordinatesMatrix[0][0],
    y: outputCoordinatesMatrix[1][0],
  };
};

export default convertCanvasCoordinates;
