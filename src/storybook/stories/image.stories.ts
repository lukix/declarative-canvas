import { createDrawFunction, objectTypes } from '../../index';
import createCanvasElement from '../utils/createCanvasElement';
import jsLogoPath from './resources/js-logo.png';

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

const createDivWithContent = (content: string) => {
  const $div = document.createElement('div');
  $div.innerText = content;
  return $div;
};

export const imageBasic = {
  name: 'Image',
  description: 'Drawing images',
  create: () => {
    const { $canvas, context } = createCanvasElement();

    if (!context) {
      return {
        element: createDivWithContent('Context identifier is not supported'),
      };
    }

    const draw = createDrawFunction();

    createImage(jsLogoPath).then(jsLogo => {
      const objects = [
        {
          type: objectTypes.IMAGE,
          contextProps: { fillStyle: '#BEC6A0' },
          x: 150,
          y: 150,
          image: jsLogo as CanvasImageSource,
        },
        {
          type: objectTypes.IMAGE,
          contextProps: { fillStyle: '#BEC6A0' },
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

    return {
      element: $canvas,
    };
  },
};
