import { Camera } from './types';
import { getTransformMatrix } from './getTransformMatrix';
import multiplyMatrices from './multiplyMatrices';

const convertWorldCoordinates = (
  x: number,
  y: number,
  canvasWidth: number,
  canvasHeight: number,
  camera: Camera
) => {
  const transformMatrix = getTransformMatrix({
    canvasWidth,
    canvasHeight,
    camera,
  });

  const inputCoordinatesMatrix = [[x], [y], [1]];
  const outputCoordinatesMatrix = multiplyMatrices(
    transformMatrix,
    inputCoordinatesMatrix
  );

  return {
    x: outputCoordinatesMatrix[0][0],
    y: outputCoordinatesMatrix[1][0],
  };
};

export default convertWorldCoordinates;
