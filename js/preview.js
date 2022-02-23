import { postOpen } from './post.js';
import { showBlockFilter } from './filter.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesBlock = document.querySelector('.pictures');

const removePictures = () => {
  const pictures = picturesBlock.querySelectorAll('.picture');

  pictures.forEach(picture => {
    picture.remove();
  });
};

const createPostPreview = (post) => {
  const postPreview = pictureTemplate.cloneNode(true);

  postPreview.querySelector('.picture__img').src = post.url;
  postPreview.querySelector('.picture__comments').textContent = post.comments.length;
  postPreview.querySelector('.picture__likes').textContent = post.likes;

  postPreview.addEventListener('click', (evt) => {
    evt.preventDefault();
    postOpen(post);
  });

  return postPreview;
};

const renderPosts = (posts, callback) => {
  const picturesFragment = document.createDocumentFragment();

  posts.forEach((post) => {
    picturesFragment.appendChild(createPostPreview(post));
  });

  picturesBlock.appendChild(picturesFragment);

  showBlockFilter();

  if (callback) {
    callback();
  }
};

export { removePictures, renderPosts };
