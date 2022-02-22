import { renderPosts } from './preview.js';
import { request } from './network.js';
import { showErrorReceive } from './modal.js';
import './upload-form.js';
import './filter.js';

let posts;

const onSuccess = (data) => {
  posts = data;
  renderPosts(data);
};

request(onSuccess, showErrorReceive, 'GET');

export { posts };
