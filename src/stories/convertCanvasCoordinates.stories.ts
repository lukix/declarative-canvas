import {
  createDrawFunction,
  objectTypes,
  convertCanvasCoordinates,
} from '../index';
import createCanvasElement from './utils/createCanvasElement';
import createCanvasDescriptionWrapper from './utils/createCanvasDescriptionWrapper';

const draw = createDrawFunction();

export default { title: 'Convert Canvas Coordinates' };

export const convertCoordinates = () => {
  const { $canvas, context } = createCanvasElement();

  if (!context) {
    return 'Context identifier is not supported';
  }

  const centerAlign: CanvasTextAlign = 'center';
  const middleBaseline: CanvasTextBaseline = 'middle';

  const textObject = {
    type: objectTypes.TEXT,
    contextProps: {
      fillStyle: 'indianred',
      font: '40px Courier',
      textAlign: centerAlign,
      textBaseline: middleBaseline,
    },
    x: 50,
    y: 250,
    text: 'Click to add objects',
  };

  const dotObjects = [] as Array<{
    type: objectTypes;
    contextProps: Partial<CanvasRenderingContext2D>;
    x: number;
    y: number;
    radius: number;
  }>;

  const camera = {
    position: { x: textObject.x, y: textObject.y },
    zoom: 0.8,
  };

  $canvas.addEventListener('click', event => {
    const { x, y } = convertCanvasCoordinates(
      event.offsetX,
      event.offsetY,
      $canvas.width,
      $canvas.height,
      camera
    );

    dotObjects.push({
      type: objectTypes.CIRCLE,
      contextProps: { fillStyle: 'lightsalmon' },
      x: x,
      y: y,
      radius: 20,
    });
  });

  const drawLoop = () => {
    const objects = [textObject, ...dotObjects];
    draw({ context, objects, camera });
    requestAnimationFrame(drawLoop);
  };

  drawLoop();

  return createCanvasDescriptionWrapper(
    `declarative-canvas exports a function that lets you convert canvas coordinates
    (for example event.offsetX and event.offsetY from onclick event)
    to base coordinates that you use to render objects
    (taking into account any transformations caused by camera's position and zoom).`,
    $canvas
  );
};
