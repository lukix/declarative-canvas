const createCanvasDescriptionWrapper = (
  description: string,
  $canvas: HTMLCanvasElement
) => {
  const $wrapper = document.createElement('div');
  const $description = document.createElement('p');
  $description.innerHTML = description;
  $description.style.maxWidth = `${$canvas.width}px`;
  $wrapper.appendChild($description);
  $wrapper.appendChild($canvas);

  return $wrapper;
};

export default createCanvasDescriptionWrapper;
