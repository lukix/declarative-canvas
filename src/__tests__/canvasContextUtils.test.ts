import { fillAndStroke } from '../canvasContextUtils';
import drawMethods from '../drawMethods';

const getContext = () => {
  const context = {
    fill: jest.fn(),
    stroke: jest.fn(),
  };

  return (context as unknown) as CanvasRenderingContext2D;
};

describe('canvasContextUtils', () => {
  describe('fillAndStroke', () => {
    it('should call fill method when draw method is FILL', () => {
      // given
      const context = getContext();
      const drawMethod = drawMethods.FILL;

      // when
      fillAndStroke(context, drawMethod);

      // then
      expect(context.fill).toHaveBeenCalledTimes(1);
      expect(context.stroke).toHaveBeenCalledTimes(0);
    });

    it('should call stroke method when draw method is STROKE', () => {
      // given
      const context = getContext();
      const drawMethod = drawMethods.STROKE;

      // when
      fillAndStroke(context, drawMethod);

      // then
      expect(context.fill).toHaveBeenCalledTimes(0);
      expect(context.stroke).toHaveBeenCalledTimes(1);
    });

    it('should call both fill and stroke methods when draw method is FILL_AND_STROKE', () => {
      // given
      const context = getContext();
      const drawMethod = drawMethods.FILL_AND_STROKE;

      // when
      fillAndStroke(context, drawMethod);

      // then
      expect(context.fill).toHaveBeenCalledTimes(1);
      expect(context.stroke).toHaveBeenCalledTimes(1);
    });
  });
});
