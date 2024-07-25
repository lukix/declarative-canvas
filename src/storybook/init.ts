import stories, { CreatedStoryType } from './stories/index';

const $storyContainer = document.querySelector('#story-container');
const $menu = document.querySelector('#menu');

if (!$menu || !$storyContainer) {
  throw Error('Root elements not found');
}

let createdStory: CreatedStoryType | null = null;

const createDescriptionElement = (description: string) => {
  const $description = document.createElement('p');
  $description.classList.add('story-description');
  $description.innerText = description;
  return $description;
};

const selectStory = (storyIndex: number) => {
  // Clean up old story
  if (createdStory) {
    createdStory.cleanUp?.();
  }

  // Clean up DOM
  document.querySelector('.menu-item.selected')?.classList.remove('selected');
  $storyContainer.innerHTML = '';

  const newStory = stories[storyIndex];
  const $newStoryMenuItem = document.querySelector(
    `[data-story-index="${storyIndex}"]`
  );

  $newStoryMenuItem?.classList.add('selected');

  createdStory = newStory.create();
  if (newStory.description) {
    $storyContainer.appendChild(createDescriptionElement(newStory.description));
  }
  $storyContainer.appendChild(createdStory.element);
};

const createMenuItem = (storyIndex: number) => {
  const story = stories[storyIndex];

  const $li = document.createElement('li');
  $li.classList.add('menu-item');
  $li.innerText = story.name;
  $li.setAttribute('data-story-index', `${storyIndex}`);
  $li.addEventListener('click', () => selectStory(storyIndex));
  return $li;
};

const init = () => {
  const menuItems = stories.map((_, storyIndex) => createMenuItem(storyIndex));
  menuItems.forEach(($li) => $menu.appendChild($li));

  selectStory(0);
};

init();
