import { isEscEvent } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const social = bigPicture.querySelector('.social');
const socialComments = social.querySelector('.social__comments');
const socialCommentCount = social.querySelector('.social__comment-count');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const overlay = document.querySelector('.overlay');

const createComment = (comment) => {
  const commentBlock = commentTemplate.cloneNode(true);

  commentBlock.querySelector('.social__picture').src = comment.avatar;
  commentBlock.querySelector('.social__picture').alt = comment.name;
  commentBlock.querySelector('.social__text').textContent = comment.message;

  return commentBlock;
};

const createCommentsFragment = (comments) => {
  const commentsFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    commentsFragment.appendChild(createComment(comment));
  });

  return commentsFragment;
};

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const onOverlayClick = (evt) => {
  if (!evt.target.closest('.big-picture__preview')) {
    closeBigPicture();
  }
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  bigPictureCancel.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onPopupEscKeydown);
  overlay.removeEventListener('click', onOverlayClick);
};

const renderPost = (post) => {
  bigPicture.querySelector('.big-picture__img img').src = post.url;
  socialCommentCount.querySelector('.comments-count').textContent = post.comments.length;
  social.querySelector('.likes-count').textContent = post.likes;
  social.querySelector('.social__caption').textContent = post.description;

  socialComments.innerHTML = '';
  socialComments.appendChild(createCommentsFragment(post.comments));
};

const postOpen = (post) => {
  renderPost(post);

  bigPicture.classList.remove('hidden');
  socialCommentCount.classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');

  bigPictureCancel.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', onPopupEscKeydown);
  overlay.addEventListener('click', onOverlayClick);
};

export { postOpen };
