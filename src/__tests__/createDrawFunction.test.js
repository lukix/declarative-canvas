import { createDrawFunction } from '../index';

const getContext = () => ({
  fill: jest.fn(),
  stroke: jest.fn(),
  clearRect: () => {},
  save: () => {},
  restore: () => {},
  setTransform: () => {},
});

describe('createDrawFunction', () => {
  it('should throw an error when passing object with unknown type', () => {
    // given
    const draw = createDrawFunction();
    const objects = [{ type: 'UNKNOWN_TYPE' }];
    const context = getContext();

    // when
    const callDraw = () => draw({ context, objects });

    // then
    expect(callDraw).toThrow();
  });

  it('should call specified custom draw handler', () => {
    // given
    const draw = createDrawFunction({
      CUSTOM_TYPE: (context, { x, y }) => context.drawRect(x, y),
    });
    const objects = [{ type: 'CUSTOM_TYPE', x: 5, y: 10 }];
    const drawRectMock = jest.fn();
    const context = { ...getContext(), drawRect: drawRectMock };

    // when
    draw({ context, objects });

    // then
    expect(drawRectMock).toHaveBeenCalledTimes(1);
    expect(drawRectMock).toHaveBeenCalledWith(5, 10);
  });
});
