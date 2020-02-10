import drawText from '../drawText';
import drawMethods from '../drawMethods';

const getContext = () => ({
  fillText: jest.fn(),
  strokeText: jest.fn(),
});

describe('drawText', () => {
  it('should call fillText when draw method is FILL', () => {
    // given
    const context = getContext();
    const options = {
      text: 'Hello World',
      x: 10,
      y: 20,
      drawMethod: drawMethods.FILL,
    };

    // when
    drawText(context, options);

    // then
    expect(context.strokeText).toHaveBeenCalledTimes(0);
    expect(context.fillText).toHaveBeenCalledTimes(1);

    expect(context.fillText).toHaveBeenCalledWith(
      options.text,
      options.x,
      options.y
    );
  });

  it('should call strokeText when draw method is STROKE', () => {
    // given
    const context = getContext();
    const options = {
      text: 'Hello World',
      x: 10,
      y: 20,
      drawMethod: drawMethods.STROKE,
    };

    // when
    drawText(context, options);

    // then
    expect(context.strokeText).toHaveBeenCalledTimes(1);
    expect(context.fillText).toHaveBeenCalledTimes(0);

    expect(context.strokeText).toHaveBeenCalledWith(
      options.text,
      options.x,
      options.y
    );
  });

  it('should call both fillText and strokeText when draw method is FILL_AND_STROKE', () => {
    // given
    const context = getContext();
    const options = {
      text: 'Hello World',
      x: 10,
      y: 20,
      drawMethod: drawMethods.FILL_AND_STROKE,
    };

    // when
    drawText(context, options);

    // then
    expect(context.strokeText).toHaveBeenCalledTimes(1);
    expect(context.fillText).toHaveBeenCalledTimes(1);
  });
});
