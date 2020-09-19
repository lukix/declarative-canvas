import { createDrawFunction, objectTypes } from '../index';

const getContext = () => {
  const context = {
    fill: jest.fn(),
    stroke: jest.fn(),
    clearRect: () => {},
    save: () => {},
    restore: () => {},
    setTransform: () => {},
  };

  return (context as unknown) as CanvasRenderingContext2D;
};

describe('createDrawFunction', () => {
  it('should throw an error when passing object with unknown type', () => {
    // given
    const draw = createDrawFunction();

    // incorrect assertion in order to test a case when someone is not using TypeScript
    const UNKNOWN_TYPE = 'UNKNOWN_TYPE' as objectTypes;

    const objects = [{ type: UNKNOWN_TYPE }];
    const context = getContext();

    // when
    const callDraw = () => draw({ context, objects });

    // then
    expect(callDraw).toThrow();
  });

  it('should call specified custom draw handler', () => {
    // given
    enum CustomTypes {
      CUSTOM_TYPE = 'CUSTOM_TYPE',
    }
    const draw = createDrawFunction({
      CUSTOM_TYPE: (context, { x, y }) => context.fillRect(x, y, 20, 20),
    });
    const objects = [{ type: CustomTypes.CUSTOM_TYPE, x: 5, y: 10 }];
    const drawRectMock = jest.fn();
    const context = { ...getContext(), fillRect: drawRectMock };

    // when
    draw({ context, objects });

    // then
    expect(drawRectMock).toHaveBeenCalledTimes(1);
    expect(drawRectMock).toHaveBeenCalledWith(5, 10, 20, 20);
  });
});
