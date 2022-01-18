import { posts } from './data.js';
import { postOpen } from './post.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');

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

const renderPosts = () => {
  const picturesFragment = document.createDocumentFragment();

  posts.forEach((post) => {
    picturesFragment.appendChild(createPostPreview(post));
  });

  pictures.appendChild(picturesFragment);
};

export { renderPosts };
