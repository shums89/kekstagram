import { removePictures, renderPosts } from './preview.js';
import { POSTS_DATA, posts as generatedPosts } from './data.js';
import { posts as receivedPosts } from './load.js';
import { shuffle, debounce } from './util.js';

const filter = document.querySelector('.img-filters');
const filterForm = filter.querySelector('.img-filters__form');
const filterButtons = filterForm.querySelectorAll('.img-filters__button');

let posts;

const showBlockFilter = () => {
  filter.classList.remove('img-filters--inactive');
};

const removeActiveFilter = () => {
  filterButtons.forEach((btn) => {
    btn.classList.remove('img-filters__button--active');
  });
};

const rerender = debounce((id) => {
  let postsCurrent = posts;

  removePictures();

  switch (id) {
    case 'filter-random':
      postsCurrent = shuffle(posts.slice()).slice(0, POSTS_DATA.count_random_posts);
      break;
    case 'filter-discussed':
      postsCurrent = posts.slice().sort((a, b) => b.comments.length - a.comments.length);
  }

  renderPosts(postsCurrent);
});

const onFilterClick = (evt) => {
  const target = evt.target;
  const filterBtnActive = filterForm.querySelector('.img-filters__button--active');

  if (!posts) {
    posts = receivedPosts || generatedPosts;
  }

  if (target.classList.contains('img-filters__button')) {
    if (target.id !== filterBtnActive.id || target.id === 'filter-random') {
      if (target.id !== filterBtnActive.id) {
        removeActiveFilter();
        target.classList.add('img-filters__button--active');
      }
      rerender(target.id);
    }
  }
};

filterForm.addEventListener('click', onFilterClick);

export { showBlockFilter };
