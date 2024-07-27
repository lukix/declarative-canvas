import convertWorldCoordinates from '../convertWorldCoordinates';
import convertCanvasCoordinates from '../convertCanvasCoordinates';

describe('convertWorldCoordinates', () => {
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
    const convertedBackCoords = convertWorldCoordinates(
      convertedCoords.x,
      convertedCoords.y,
      canvasWidth,
      canvasHeight,
      camera
    );

    // then
    expect(convertedBackCoords).toEqual({ x, y });
  });
});
