const createCanvasElement = () => {
  const $canvas = document.createElement('canvas');
  $canvas.width = 600;
  $canvas.height = 600;
  $canvas.style.border = '1px solid black';

  const context = $canvas.getContext('2d');

  return { $canvas, context };
};

export default createCanvasElement;
