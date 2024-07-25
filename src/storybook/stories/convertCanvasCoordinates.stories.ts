import {
  createDrawFunction,
  objectTypes,
  convertCanvasCoordinates,
} from '../../index';
import createCanvasElement from '../utils/createCanvasElement';

const createDivWithContent = (content: string) => {
  const $div = document.createElement('div');
  $div.innerText = content;
  return $div;
};

export const convertCanvasCoordinatesBasic = {
  name: 'Convert Canvas Coordinates',
  description:
    "declarative-canvas exports a function that lets you convert canvas coordinates (for example event.offsetX and event.offsetY from onclick event) to base coordinates that you use to render objects (taking into account any transformations caused by camera's position and zoom).",
  create: () => {
    const { $canvas, context } = createCanvasElement();

    if (!context) {
      return {
        element: createDivWithContent('Context identifier is not supported'),
      };
    }

    const draw = createDrawFunction();

    const centerAlign: CanvasTextAlign = 'center';
    const middleBaseline: CanvasTextBaseline = 'middle';

    const textObject = {
      type: objectTypes.TEXT,
      contextProps: {
        fillStyle: '#708871',
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
      rotation: Math.PI / 6,
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
        contextProps: { fillStyle: '#BEC6A0' },
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

    return {
      element: $canvas,
    };
  },
};
