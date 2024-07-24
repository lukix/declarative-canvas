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

  const coordinatesMatrix = [[x], [y], [1]];
  const canvasCoordinatesMatrix = multiplyMatrices(
    inverseTransformMatrix,
    coordinatesMatrix
  );

  return {
    x: canvasCoordinatesMatrix[0][0],
    y: canvasCoordinatesMatrix[1][0],
  };
};

export default convertCanvasCoordinates;
