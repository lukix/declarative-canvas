import { createDrawFunction, objectTypes } from '../index';
import createCanvasElement from './utils/createCanvasElement';
import jsLogoPath from './resources/js-logo.png';

const draw = createDrawFunction();

const createImage = (src: string) => {
  const image = new Image();
  image.src = src;
  return new Promise((res, rej) => {
    image.onload = () => {
      return res(image);
    };
    image.onerror = rej;
  });
};

export default { title: 'Image' };

export const fillAndStroke = () => {
  const { $canvas, context } = createCanvasElement();

  if (!context) {
    return 'Context identifier is not supported';
  }

  createImage(jsLogoPath).then(jsLogo => {
    const objects = [
      {
        type: objectTypes.IMAGE,
        contextProps: { fillStyle: 'lightsalmon' },
        x: 150,
        y: 150,
        image: jsLogo as CanvasImageSource,
      },
      {
        type: objectTypes.IMAGE,
        contextProps: { fillStyle: 'lightsalmon' },
        x: 400,
        y: 150,
        width: 120,
        height: 120,
        rotation: Math.PI / 4,
        image: jsLogo as CanvasImageSource,
      },
    ];

    draw({ context, objects });
  });

  return $canvas;
};
