import convertCanvasCoordinates from '../convertCanvasCoordinates';

describe('convertCanvasCoordinates', () => {
  it('should correctly convert coordinates when camera is looking at (0,0)', () => {
    // given
    const x = 400 + 100;
    const y = 300 + 50;
    const canvasWidth = 800;
    const canvasHeight = 600;
    const camera = { zoom: 1, position: { x: 0, y: 0 } };

    // when
    const convertedCoords = convertCanvasCoordinates(
      x,
      y,
      canvasWidth,
      canvasHeight,
      camera
    );

    // then
    expect(convertedCoords).toEqual({ x: 100, y: 50 });
  });

  it('should correctly convert coordinates when zoom is not equal to 1', () => {
    // given
    const x = 400 + 100;
    const y = 300 + 50;
    const canvasWidth = 800;
    const canvasHeight = 600;
    const camera = { zoom: 0.5, position: { x: 0, y: 0 } };

    // when
    const convertedCoords = convertCanvasCoordinates(
      x,
      y,
      canvasWidth,
      canvasHeight,
      camera
    );

    // then
    expect(convertedCoords).toEqual({ x: 2 * 100, y: 2 * 50 });
  });

  it('should correctly convert coordinates when camera is displaced', () => {
    // given
    const x = 400;
    const y = 300;
    const canvasWidth = 800;
    const canvasHeight = 600;
    const camera = { zoom: 0.5, position: { x: -100, y: -100 } };

    // when
    const convertedCoords = convertCanvasCoordinates(
      x,
      y,
      canvasWidth,
      canvasHeight,
      camera
    );

    // then
    expect(convertedCoords).toEqual({ x: -100, y: -100 });
  });

  it('should correctly convert coordinates when camera is rotated', () => {
    // given
    const x = 400 + 50; // 50px to the right of canvas center
    const y = 300;
    const canvasWidth = 800;
    const canvasHeight = 600;
    const camera = {
      zoom: 0.5,
      position: { x: -100, y: -100 },
      rotation: -Math.PI / 2,
    };

    // when
    const convertedCoords = convertCanvasCoordinates(
      x,
      y,
      canvasWidth,
      canvasHeight,
      camera
    );

    // then
    expect(convertedCoords).toEqual({ x: -100, y: -100 - 50 * 2 }); // below instead of to the right due to camera rotation
  });
});
