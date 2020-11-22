import { Camera } from './types';

const convertCanvasCoordinates = (
  x: number,
  y: number,
  canvasWidth: number,
  canvasHeight: number,
  camera: Camera
) => {
  const {
    zoom,
    position: { x: cameraX, y: cameraY },
  } = camera;
  return {
    x: cameraX + (x - canvasWidth / 2) / zoom,
    y: cameraY + (y - canvasHeight / 2) / zoom,
  };
};

export default convertCanvasCoordinates;
