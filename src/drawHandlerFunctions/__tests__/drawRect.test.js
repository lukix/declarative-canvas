import drawRect from '../drawRect';
import drawMethods from '../../drawMethods';

const getContext = () => ({
  translate: () => {},
  rotate: () => {},
  fillRect: jest.fn(),
  strokeRect: jest.fn(),
});

describe('drawRect', () => {
  it('should call fillRect when draw method is FILL', () => {
    // given
    const context = getContext();
    const options = {
      x: 10,
      y: 20,
      width: 5,
      height: 5,
      drawMethod: drawMethods.FILL,
    };

    // when
    drawRect(context, options);

    // then
    expect(context.strokeRect).toHaveBeenCalledTimes(0);
    expect(context.fillRect).toHaveBeenCalledTimes(1);
  });

  it('should call strokeRect when draw method is STROKE', () => {
    // given
    const context = getContext();
    const options = {
      x: 10,
      y: 20,
      width: 5,
      height: 5,
      drawMethod: drawMethods.STROKE,
    };

    // when
    drawRect(context, options);

    // then
    expect(context.strokeRect).toHaveBeenCalledTimes(1);
    expect(context.fillRect).toHaveBeenCalledTimes(0);
  });

  it('should call both fillRect and strokeRect when draw method is FILL_AND_STROKE', () => {
    // given
    const context = getContext();
    const options = {
      x: 10,
      y: 20,
      width: 5,
      height: 5,
      drawMethod: drawMethods.FILL_AND_STROKE,
    };

    // when
    drawRect(context, options);

    // then
    expect(context.strokeRect).toHaveBeenCalledTimes(1);
    expect(context.fillRect).toHaveBeenCalledTimes(1);
  });
});
