import { createDrawFunction, objectTypes } from '../../index';
import createCanvasElement from '../utils/createCanvasElement';

const NUMBER_OF_OBJECTS = 5_000;

const createDivWithContent = (content: string) => {
  const $div = document.createElement('div');
  $div.innerText = content;
  return $div;
};

const refreshStats = (
  renderTimes: number[],
  $performancePanel?: HTMLElement
) => {
  const $performanceInfoPanel =
    $performancePanel || document.querySelector('#performance-info-panel');
  if (!$performanceInfoPanel) {
    console.warn('Performance info panel not found');
    return;
  }
  const lastRenderTime = renderTimes[renderTimes.length - 1];
  const averageRenderTime =
    renderTimes.reduce((acc, time) => acc + time, 0) / renderTimes.length;
  $performanceInfoPanel.innerHTML = `Last render time: ${lastRenderTime}ms. Average render time over ${renderTimes.length} runs: ${averageRenderTime.toFixed(2)}ms`;
};

const wrapCanvasInPerformanceInfoPanel = (
  $canvas: HTMLCanvasElement,
  renderTimes: number[] = []
) => {
  const $wrapper = document.createElement('div');
  const $performanceInfoPanel = document.createElement('div');
  $performanceInfoPanel.id = 'performance-info-panel';

  $wrapper.append($performanceInfoPanel);
  $wrapper.append($canvas);

  refreshStats(renderTimes, $performanceInfoPanel);

  return $wrapper;
};

export const performanceBasic = {
  name: 'Performance',
  description: `Performance test of rendering ${NUMBER_OF_OBJECTS} objects. Click on canvas to rerender.`,
  create: () => {
    const { $canvas, context } = createCanvasElement();

    if (!context) {
      return {
        element: createDivWithContent('Context identifier is not supported'),
      };
    }

    const draw = createDrawFunction();

    const renderTimes: number[] = [];

    const drawAndCollectStats = () => {
      const rects = new Array(NUMBER_OF_OBJECTS).fill(0).map(() => ({
        x: Math.random() * $canvas.width,
        y: Math.random() * $canvas.height,
        rotation: Math.random() * Math.PI,
        color: ['#BEC6A0', '#708871', '#4d5565'][Math.round(Math.random() * 2)],
      }));

      const objects = [
        ...rects.map(({ x, y, rotation, color }) => ({
          type: objectTypes.RECT,
          contextProps: {
            fillStyle: color,
          },
          x,
          y,
          rotation,
          width: 12,
          height: 12,
        })),
      ];

      const timeStart = performance.now();
      draw({ context, objects });
      const renderTime = performance.now() - timeStart;

      renderTimes.push(renderTime);
    };

    drawAndCollectStats();

    const redraw = () => {
      drawAndCollectStats();
      refreshStats(renderTimes);
    };
    $canvas.addEventListener('click', redraw);

    const $element = wrapCanvasInPerformanceInfoPanel($canvas, renderTimes);

    return {
      element: $element,
      cleanUp: () => {
        $canvas.removeEventListener('click', redraw);
      },
    };
  },
};
