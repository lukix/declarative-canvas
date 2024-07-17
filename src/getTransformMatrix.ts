import { Camera } from './types';
import multiplyMatrices from './multiplyMatrices';

const getTranslationMatrix = (x: number, y: number) => {
  return [
    [1, 0, x],
    [0, 1, y],
    [0, 0, 1],
  ];
};

const getRotationMatrix = (rotation: number) => {
  return [
    [Math.cos(rotation), -Math.sin(rotation), 0],
    [Math.sin(rotation), Math.cos(rotation), 0],
    [0, 0, 1],
  ];
};

const getScalingMatrix = (zoom: number) => {
  return [
    [zoom, 0, 0],
    [0, zoom, 0],
    [0, 0, 1],
  ];
};

export const getTransformMatrix = ({
  canvasWidth,
  canvasHeight,
  camera,
}: {
  canvasWidth: number;
  canvasHeight: number;
  camera: Camera;
}) => {
  const originTranslationMatrix = getTranslationMatrix(
    -camera.position.x,
    -camera.position.y
  );
  const canvasCenteringTranslationMatrix = getTranslationMatrix(
    canvasWidth / 2,
    canvasHeight / 2
  );
  const scalingMatrix = getScalingMatrix(camera.zoom);
  const rotationMatrix = getRotationMatrix(-(camera.rotation || 0));

  return multiplyMatrices(
    canvasCenteringTranslationMatrix,
    scalingMatrix,
    rotationMatrix,
    originTranslationMatrix
  );
};

export const getInverseTransformMatrix = ({
  canvasWidth,
  canvasHeight,
  camera,
}: {
  canvasWidth: number;
  canvasHeight: number;
  camera: Camera;
}) => {
  const originTranslationMatrix = getTranslationMatrix(
    camera.position.x,
    camera.position.y
  );
  const canvasCenteringTranslationMatrix = getTranslationMatrix(
    -canvasWidth / 2,
    -canvasHeight / 2
  );
  const scalingMatrix = getScalingMatrix(1 / camera.zoom);
  const rotationMatrix = getRotationMatrix(camera.rotation || 0);

  return multiplyMatrices(
    originTranslationMatrix,
    rotationMatrix,
    scalingMatrix,
    canvasCenteringTranslationMatrix
  );
};
