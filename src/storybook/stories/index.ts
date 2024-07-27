import { rectBasic, rectFillAndStroke, rectRotated } from './rect.stories';
import { animation } from './animation.stories';
import { cameraTranslation, cameraRotation } from './camera.stories';
import { circleBasic } from './circle.stories';
import { pathBasic } from './path.stories';
import { textBasic } from './text.stories';
import { imageBasic } from './image.stories';
import { transformBasic } from './transform.stories';
import { customHandlersBasic } from './customHandlers.stories';
import { convertCanvasCoordinatesBasic } from './convertCanvasCoordinates.stories';
import { performanceBasic } from './performance.stories';

export type CreatedStoryType = {
  element: HTMLElement;
  cleanUp?: () => void;
};

export type StoryType = {
  name: string;
  description?: string;
  create: () => CreatedStoryType;
};

const stories: StoryType[] = [
  animation,
  rectBasic,
  rectRotated,
  rectFillAndStroke,
  circleBasic,
  cameraTranslation,
  cameraRotation,
  pathBasic,
  textBasic,
  imageBasic,
  transformBasic,
  customHandlersBasic,
  convertCanvasCoordinatesBasic,
  performanceBasic,
];

export default stories;
