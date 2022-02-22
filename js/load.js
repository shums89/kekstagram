import { renderPosts } from './preview.js';
import { request } from './network.js';
import { showErrorReceive } from './modal.js';
import { createPosts, posts as generatedPosts } from './data.js';

let posts;

const onSuccess = (data) => {
  posts = data;
  renderPosts(data);
};

const onFail = (message) => {
  showErrorReceive(message)
    .then(() => createPosts())
    .then(() => renderPosts(generatedPosts));
};

const getData = () => {
  request(onSuccess, onFail, 'GET');
};

export { posts, getData };
