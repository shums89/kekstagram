import { posts } from './data.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');

const renderPost = ({ url, likes, comments }) => {
  const postPreview = pictureTemplate.cloneNode(true);

  postPreview.querySelector('.picture__img').src = url;
  postPreview.querySelector('.picture__comments').textContent = comments.length;
  postPreview.querySelector('.picture__likes').textContent = likes;

  return postPreview;
};

const renderPosts = () => {
  let picturesFragment = document.createDocumentFragment();

  posts.forEach((post) => {
    picturesFragment.appendChild(renderPost(post));
  });

  pictures.appendChild(picturesFragment);
};

export { renderPosts };
